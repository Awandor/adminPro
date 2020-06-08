import { Injectable } from '@angular/core';

// Importamos el modelo de usuario que vamos a enviar al back-end

import { Usuario } from '../../models/usuario.model';

// Importamos las variables de entorno

import { environment } from 'src/environments/environment';

// Importamos HttpClient para poder hacer peticiones http

// También tenemos que importar el HttpClient en services.module

import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Importamos Router para poder navegar
import { Router } from '@angular/router';

import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service'; // ojo a nuestro index de servicios, error cíclico?

import { Observable, throwError } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {

  usuario: Usuario;

  token: string;

  menu: any[] = [];

  constructor( public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService ) {

    console.log( 'Servicio de usuario listo' );

    this.cargarStorage();

  }

  crearUsuario( usuario: Usuario ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/usuario.route';

    // Retornamos un observable al que nos podemos suscribir

    return this.http.post( url, usuario ).pipe( map( ( resp: any ) => {

      // Vamos a alertar al usuario que el registro sea ha realizado con éxito

      Swal.fire( {
        title: 'Usuario creado',
        text: usuario.email,
        icon: 'success'
      } );

      return resp.usuario;

    } ), catchError( err => {

      console.log( 'catchError', err );

      Swal.fire( {
        title: 'Error en el registro',
        text: err.error.errors.message,
        icon: 'error'
      } );

      return throwError( err );

    } ) );

  }

  loginUsuario( usuario: Usuario, recordar: boolean = false ) {

    // Guardamos en local storage em email

    if ( recordar ) {

      localStorage.setItem( 'email', usuario.email );

    } else {

      localStorage.removeItem( 'email' ); // Si no existe no retorna ningún error

    }

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/login.route';

    return this.http.post( url, usuario ).pipe( map( ( resp: any ) => {

      // Guardamos en local storage

      /* localStorage.setItem( 'id', resp.id );
      localStorage.setItem( 'token', resp.token );
      localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ) ); */

      this.guardarLocalStorage( resp.id, resp.token, resp.usuario, resp.menu );

      return true; // Para recibir algo en el suscriptor, puede ser lo que queramos

    } ), catchError( err => {

      console.log( 'catchError', err );

      Swal.fire( {
        title: 'Error en login',
        text: err.error.mensaje,
        icon: 'error'
      } );

      return throwError( err );

    } ) );

  }

  loginUsuarioGoogle( token: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/login.route/google';

    return this.http.post( url, { token: token } ).pipe( map( ( resp: any ) => {

      // Guardamos en local storage

      /* localStorage.setItem( 'id', resp.id );
      localStorage.setItem( 'token', resp.token );
      localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ) ); */

      this.guardarLocalStorage( resp.id, resp.token, resp.usuario, resp.menu );

      return true; // Para recibir algo en el suscriptor, puede ser lo que queramos

    } ) );

  }

  guardarLocalStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );
    localStorage.setItem( 'menu', JSON.stringify( menu ) );

    this.usuario = usuario;

    this.token = token;

    this.menu = menu;

  }

  estaLogueado() {

    // Si existe el token es que está logueado, auque se hackee el back-end tiene sus validaciones también, lo usaremos en login-guard.guard

    return ( this.token.length > 5 ) ? true : false;

  }

  // Vamos setear las variables para que nunca sean undefined y llamamos al método en el constructor

  cargarStorage() {

    if ( localStorage.getItem( 'token' ) ) {

      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
      this.menu = JSON.parse( localStorage.getItem( 'menu' ) );

    } else {

      this.token = '';
      this.usuario = null;
      this.menu = [];

    }

  }

  logout() {

    this.token = '';
    this.usuario = null;
    this.menu = [];

    // localStorage.clear(); // Borra todo quermos mantener los settings

    localStorage.removeItem( 'token' );

    localStorage.removeItem( 'usuario' );

    localStorage.removeItem( 'menu' );

    /* Swal.fire( {
      title: 'You have been logged out',
      icon: 'success'
    } ); */

    // Ahora podemos navegar al login, necesitamos importar Router e inyectarlo en el constructor como siempre
    this.router.navigate( [ '/login' ] );

  }

  actualizarUsuario( usuario: Usuario ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/usuario.route/' + usuario._id + '?token=' + this.token;

    // Retornamos un observable al que nos podemos suscribir

    return this.http.put( url, usuario ).pipe( map( ( resp: any ) => {

      // console.log( 'respuesta del suscriptor', resp );

      // Refactorizamos para poder usar este método para otra cosas como actualizar el role

      if ( usuario._id === this.usuario._id ) {

        const usuarioDB: Usuario = resp.usuario;

        this.guardarLocalStorage( usuarioDB._id, this.token, usuarioDB, this.menu );

      }

      Swal.fire( {
        title: 'Usuario actualizado',
        text: usuario.nombre,
        icon: 'success'
      } );

      return true;

    } ), catchError( err => {

      console.log( 'catchError', err );

      Swal.fire( {
        title: 'Error al actualizar',
        text: err.error.errors.message,
        icon: 'error'
      } );

      return throwError( err );

    } ) );

  }

  prepararSubirArchivo( archivo: File, id: string ) {

    console.log( 'imagen' );

    // subirArchivoService retorna una promesa
    this.subirArchivoService.subirArchivo( archivo, 'usuarios', id ).then( ( resp: any ) => {

      // console.log( 'subido: ', resp ); // Es un JSON string hay que volver a convertirlo en un objeto

      const objetoRespuesta = JSON.parse( resp );

      console.log( objetoRespuesta );

      this.usuario.img = objetoRespuesta.usuario.img;

      const usuarioDB: Usuario = objetoRespuesta.usuario;

      this.guardarLocalStorage( id, this.token, this.usuario, this.menu );

      Swal.fire( {
        title: 'Imagen de usuario actualizada',
        text: usuarioDB.nombre,
        icon: 'success'
      } );

      return true;

    } ).catch( resp => {

      console.log( resp );

    } );

  }

  obtenerUsuarios( desde: number = 0 ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/usuario.route?desde=' + desde;

    return this.http.get( url, {} );

  }

  buscarUsuarioConcreto( terminoBusqueda: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/busqueda.route/coleccion/usuarios/' + terminoBusqueda;

    return this.http.get( url, {} ).pipe( map( ( resp: any ) => resp.usuarios ) );

  }

  borrarUsuario( id: string ) {

    console.log( 'Usuario a borrar', id );

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/usuario.route/' + id + '?token=' + this.token;

    console.log( 'Ruta enviada al back-end', url );

    // Retornamos un observable al que nos podemos suscribir

    return this.http.delete( url ).pipe( map( ( resp: any ) => {

      console.log( 'respuesta de back-end', resp );

      /* const usuarioDB: Usuario = resp.usuario;

      this.guardarLocalStorage( usuarioDB._id, this.token, usuarioDB ); */

      Swal.fire( {
        title: 'Usuario borrado',
        text: resp.usuario.nombre,
        icon: 'success'
      } );

      return true;

    } ) );

  }

  renuevaToken() {

    const url = environment.url_services + '/login.route/renuevatoken/?token=' + this.token;

    return this.http.get( url ).pipe( map( ( resp: any ) => {

      console.log( 'respuesta de back-end', resp );

      console.log( 'token renovado' );

      this.token = resp.token;

      localStorage.setItem( 'token', resp.token );

      return true;

    } ), catchError( err => {

      console.log( 'catchError', err );

      this.router.navigate( [ '/login' ] );

      Swal.fire( {
        title: 'Error de token',
        text: 'No se pudo renovar el token',
        icon: 'error'
      } );

      return throwError( err );

    } ) );

  }

}
