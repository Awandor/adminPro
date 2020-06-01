import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

import Swal from 'sweetalert2';

@Component( {
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
} )
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  titulo: string;

  constructor( public hospitalService: HospitalService, public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {

    this.obtenerHospitales();

    this.modalUploadService.notificacionSubidaImagen.subscribe( ( resp: any ) => {

      // console.log( 'notificacionSubidaImagen', resp );

      this.obtenerHospitales();

    } );

  }

  obtenerHospitales() {

    this.cargando = true;

    this.titulo = 'Hospitales registrados';

    this.hospitalService.obtenerHospitales( this.desde ).subscribe( ( resp: any ) => {

      console.log( 'obtenerHospitales', resp );

      this.totalRegistros = resp.total;

      this.hospitales = resp.hospitales;

      this.cargando = false;

    } );

  }

  buscarHospital( terminoBusqueda: string ) {

    console.log( terminoBusqueda );

    if ( terminoBusqueda.length > 2 ) {

      this.cargando = true;

      this.hospitalService.buscarhospitalConcreto( terminoBusqueda ).subscribe( ( resp: Hospital[] ) => {

        console.log( resp );

        this.totalRegistros = resp.length;

        this.hospitales = resp;

        this.titulo = 'Hospitales encontrados';

        this.cargando = false;

      } );

    }

    if ( terminoBusqueda.length <= 0 ) {

      this.obtenerHospitales();

    }

  }

  borrarHospital( hospital: Hospital ) {

    // console.log( hospital );

    Swal.fire( {
      title: '¿Estás seguro?',
      text: '¿Quieres borrar el hospital ' + hospital.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, bórralo!'
    } ).then( ( result ) => {

      if ( result.value ) {

        this.cargando = true;

        this.hospitalService.borrarHospital( hospital._id ).subscribe( resp => {

          console.log( resp );

          this.cargando = false;

          this.obtenerHospitales();

        } );

      }

    } );

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {

      return;

    } else if ( desde < 0 ) {

      return;

    }

    this.desde += valor;

    this.obtenerHospitales();

  }

  actualizarHospital( hospital: Hospital ) {

    this.cargando = true;

    this.hospitalService.actualizarHospital( hospital ).subscribe( resp => {

      console.log( resp );

      this.cargando = false;

      this.obtenerHospitales();

    } );

  }

  crearHospital() {

    /* const usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password
    ); */

    Swal.fire( {

      title: 'Crear hospital',
      text: 'Introduce el nombre del hospital',
      input: 'text',
      icon: 'info',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: ( nombre: string ) => {

        /* return fetch( `//api.github.com/users/${ nombre }` )
          .then( response => {

            if ( !response.ok ) {

              throw new Error( response.statusText );

            }

            return response.json();

          } )
          .catch( error => {

            Swal.showValidationMessage(
              `Request failed: ${ error }`
            );

          } ); */

        this.hospitalService.crearHospital( nombre ).subscribe( resp => {

          console.log( 'crearHospital: ', resp );

          if ( !resp.ok ) {

            throw new Error( resp.statusText );

          }

          this.obtenerHospitales();

        }, err => {

          console.log( err );

          Swal.showValidationMessage(
            `Request failed: ${ err.status }`
          );

        } );

      },
      allowOutsideClick: () => !Swal.isLoading()

    } ).then( ( result ) => {

      if ( result.value ) {

        // console.log( result.value );

        Swal.fire( {
          title: `${ result.value }`,
          text: 'hospital creado',
          icon: 'success'
        } );

      }

    } );

  }

}
