import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

import Swal from 'sweetalert2';

@Component( {
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
} )
export class MedicosComponent implements OnInit {

  cargando: boolean = true;

  titulo: string;

  totalRegistros: number = 0;

  desde: number = 0;

  medicos: Medico[] = [];

  constructor( public medicoService: MedicoService ) { }

  ngOnInit(): void {

    this.obtenerMedicos();

  }

  obtenerMedicos() {

    this.cargando = true;

    this.titulo = 'Medicos registrados';

    this.medicoService.obtenerMedicos( this.desde ).subscribe( ( resp: any ) => {

      console.log( 'obtenerMedicos', resp );

      this.totalRegistros = resp.total;

      this.medicos = resp.medicos;

      this.cargando = false;

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

    this.obtenerMedicos();

  }

  buscarMedico( terminoBusqueda: string ) {

    console.log( terminoBusqueda );

    if ( terminoBusqueda.length > 2 ) {

      this.cargando = true;

      this.medicoService.buscarMedicoConcreto( terminoBusqueda ).subscribe( ( resp: Medico[] ) => {

        console.log( resp );

        this.totalRegistros = resp.length;

        this.medicos = resp;

        this.titulo = 'Medicos encontrados';

        this.cargando = false;

      } );

    }

    if ( terminoBusqueda.length <= 0 ) {

      this.obtenerMedicos();

    }

  }

  borrarMedico( medico: Medico ) {

    // console.log( medico );

    Swal.fire( {
      title: '¿Estás seguro?',
      text: '¿Quieres borrar el hospital ' + medico.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, bórralo!'
    } ).then( ( result ) => {

      if ( result.value ) {

        this.cargando = true;

        this.medicoService.borrarMedico( medico._id ).subscribe( resp => {

          console.log( resp );

          this.cargando = false;

          this.obtenerMedicos();

        } );

      }

    } );

  }

}
