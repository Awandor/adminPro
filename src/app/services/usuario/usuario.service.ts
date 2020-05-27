import { Injectable } from '@angular/core';

// Importamos el modelo de usuario que vamos a enviar al back-end

import { Usuario } from '../../models/usuario.model';

// Importamos las variables de entorno

import { environment } from 'src/environments/environment';

// Importamos HttpClient para poder hacer peticiones http

// También tenemos que importar el HttpClient en services.module

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Importamos Router para poder navegar
import { Router } from '@angular/router';

import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service'; // ojo a nuestro index de servicios, error cíclico?

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {

  usuario: Usuario;

  token: string;

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

    } ) );

  }

  loginUsuario( usuario: Usuario, recordar: Boolean = false ) {

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

      this.guardarLocalStorage( resp.id, resp.token, resp.usuario );

      return true; // Para recibir algo en el suscriptor, puede ser lo que queramos

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

      this.guardarLocalStorage( resp.id, resp.token, resp.usuario );

      return true; // Para recibir algo en el suscriptor, puede ser lo que queramos

    } ) );

  }

  guardarLocalStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;

    this.token = token;

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

    } else {

      this.token = '';
      this.usuario = null;

    }

  }

  logout() {

    this.token = '';
    this.usuario = null;

    // localStorage.clear(); // Borra todo quermos mantener los settings

    localStorage.removeItem( 'token' );

    localStorage.removeItem( 'usuario' );

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

      const usuarioDB: Usuario = resp.usuario;

      this.guardarLocalStorage( usuarioDB._id, this.token, usuarioDB );

      Swal.fire( {
        title: 'Usuario actualizado',
        text: usuario.nombre,
        icon: 'success'
      } );

      return true;

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

      this.guardarLocalStorage( id, this.token, this.usuario );

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

}
