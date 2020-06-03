import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/service.index';
import { SubirArchivoService } from '../../services/service.index';

import Swal from 'sweetalert2';

// Router Para poder navegar y ActivatedRoute para tomar la ruta activa

import { Router, ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
} )
export class MedicoComponent implements OnInit {

  cargando: boolean = true;

  // titulo: string;

  // totalRegistros: number = 0;

  // desde: number = 0;

  medico: Medico = new Medico( '', '', '', '' ); // Necesitamos comillas vacías para el hospital para que salga Seleccione...

  hospitales: Hospital[] = [];

  hospital: Hospital = new Hospital( '' );

  imagenHospital: string = '';

  imagenSubir: File;

  imagenTemp: string | ArrayBuffer;

  constructor(
    public medicoService: MedicoService, public hospitalService: HospitalService,
    public router: Router, public activatedRoute: ActivatedRoute,
    public subirArchivoService: SubirArchivoService ) {

    activatedRoute.params.subscribe( params => {

      const id = params.id;

      // En caso de editar recibimos todos los datos del médico

      if ( id !== 'nuevo' ) {

        this.obtenerMedicoConcreto( id );

      }

    } );
  }

  ngOnInit(): void {

    // Cargamos todos los hospitales, nos suscribimos

    this.hospitalService.obtenerHospitales().subscribe( ( resp: any ) => {

      console.log( 'obtenerHospitales', resp );

      this.hospitales = resp.hospitales;

      this.cargando = false;

    } );

  }

  obtenerMedicoConcreto( id: string ) {

    this.medicoService.obtenerMedicoConcreto( id ).subscribe( resp => {

      console.log( 'medicoService:', resp );

      this.cargando = false;

      this.medico = resp;

      // El modelo Medico tiene el hospital como string

      this.medico.hospital = resp.hospital._id;

      this.mostrarHospital( this.medico.hospital );

    } );

  }

  // Mejor que pasar el evento pasamos el id, así podemos reutilizar más fácilmente la función

  mostrarHospital( id: string ) {

    // Necesitamos especificar as HTMLSelectElement

    // const id = ( event.target as HTMLSelectElement ).value;

    console.log( id );

    this.hospitalService.obtenerHospitalPorId( id ).subscribe( resp => {

      console.log( 'obtenerHospitalPorId', resp );

      this.hospital = resp;

    } );

  }

  guardarMedico( formulario: NgForm ) {

    // console.log( formulario.valid );
    // console.log( formulario.value );
    // console.log( this.medico );

    // El formulario sólo lo queremos para ver si es válido, el médico ya tiene valores

    if ( formulario.invalid ) {

      return;

    }

    this.cargando = true;

    this.medicoService.guardarMedico( this.medico ).subscribe( resp => {

      // console.log( resp );

      this.cargando = false;

      this.medico._id = resp._id;

      // this.router.navigate( [ '/medico', this.medico._id ] );

    } );

  }

  seleccionarImagen( archivo: File ) {

    console.log( archivo );

    if ( !archivo ) {

      this.imagenSubir = null;

      return;

    }

    // Vamos a comprobar que el archivo es una imagen

    if ( archivo.type.indexOf( 'image' ) < 0 ) {

      Swal.fire( {
        title: 'Sólo se permiten imágenes',
        text: `${ archivo.type } no es del tipo permitido: jpg, jpeg, gif, png`,
        icon: 'error'
      } );

      this.imagenSubir = null;

      return; // para salir

    }

    this.imagenSubir = archivo;

    /* Esto es JS Vanilla */

    const reader = new FileReader();

    const urlImagenTemp = reader.readAsDataURL( archivo );

    // console.log( 'urlImagenTemp', urlImagenTemp );

    reader.onloadend = () => {

      // console.log( reader.result ); // Imagen en base 64

      this.imagenTemp = reader.result;

    };

  }

  cambiarImagen() {

    this.subirArchivoService.subirArchivo( this.imagenSubir, 'medicos', this.medico._id ).then( ( resp: any ) => {

      // console.log( 'subido: ', resp ); // Es un JSON string hay que volver a convertirlo en un objeto

      const objetoRespuesta = JSON.parse( resp );

      // console.log( 'objetoRespuesta', objetoRespuesta );

      // this.medico.img = objetoRespuesta.usuario.img;

      Swal.fire( {
        title: 'Imagen de médico actualizada',
        text: objetoRespuesta.nombre,
        icon: 'success'
      } );

      return true;

    } ).catch( resp => {

      console.log( resp );

    } );

  }

}
