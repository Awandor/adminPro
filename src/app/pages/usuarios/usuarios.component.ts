import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component( {
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
} )
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor( public usuarioService: UsuarioService, public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {

    this.obtenerUsuariosRegistrados();

    // Vamos a suscribirnos a notificacionSubidaImagen

    this.modalUploadService.notificacionSubidaImagen.subscribe( ( resp: any ) => {

      // console.log( 'notificacionSubidaImagen', resp );

      this.obtenerUsuariosRegistrados();

    } );

  }

  obtenerUsuariosRegistrados() {

    this.cargando = true;

    this.usuarioService.obtenerUsuarios( this.desde ).subscribe( ( resp: any ) => {

      console.log( resp );

      this.totalRegistros = resp.total;

      this.usuarios = resp.usuarios;

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

    this.obtenerUsuariosRegistrados();

  }

  buscarUsuario( terminoBusqueda: string ) {

    console.log( terminoBusqueda );

    if ( terminoBusqueda.length > 2 ) {

      this.cargando = true;

      this.usuarioService.buscarUsuarioConcreto( terminoBusqueda ).subscribe( ( resp: Usuario[] ) => {

        console.log( resp );

        this.usuarios = resp;

        this.cargando = false;

      } );
    }

    if ( terminoBusqueda.length <= 0 ) {

      this.obtenerUsuariosRegistrados();

    }

  }

  borrarUsuario( usuario: Usuario ) {

    console.log( usuario );

    // Impedir que el usuario se borre a sí mismo

    if ( usuario._id === this.usuarioService.usuario._id ) {

      Swal.fire( {
        title: 'No se puede borrar usuario',
        text: 'No puede borrar su propio usuario ' + usuario.nombre,
        icon: 'error'
      } );

      return;
    }

    Swal.fire( {
      title: '¿Estás seguro?',
      text: '¿Quieres borrar el usuario ' + usuario.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, bórralo!'
    } ).then( ( result ) => {

      if ( result.value ) {

        this.cargando = true;

        this.usuarioService.borrarUsuario( usuario._id ).subscribe( resp => {

          console.log( resp );

          this.cargando = false;

          this.obtenerUsuariosRegistrados();

        } );

      }

    } );

  }

  guardarUsuario( usuario: Usuario ) {

    this.usuarioService.actualizarUsuario( usuario ).subscribe( resp => {

      console.log( resp );

      // this.cargando = false;

      // this.obtenerUsuariosRegistrados();

    } );

  }

}
