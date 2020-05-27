import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

// Importamos el servicio cuidado con la ruta queremos usar nuestor service.index
import { UsuarioService } from '../services/service.index';

// Importamos el modelo del Usuario
import { Usuario } from '../models/usuario.model';

// Importamos Router para poder navegar
import { Router } from '@angular/router';

// Para poder usar una función cargada desde el index.html usamos declare y luego la ejecutamos

declare function initPlugins(): void;

// Vamos a usar la librería de Google Sign-in importada en el index.fa-html

declare const gapi: any;

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  email: string;

  auth2: any; // The Sign-in object

  constructor( public usuarioService: UsuarioService, private router: Router, private ngZone: NgZone ) { }

  ngOnInit(): void {

    initPlugins();

    this.email = localStorage.getItem( 'email' ) || '';

    if ( this.email.length > 1 ) {

      this.recuerdame = true;

    }

    this.googleInit();

  }

  ingresar( formulario: NgForm ) {

    console.log( formulario.valid );
    console.log( formulario.value );

    if ( formulario.invalid ) {

      return;

    }

    const usuario = new Usuario( null, formulario.value.email, formulario.value.password );

    // Llamamos al servicio, nos tenemos que suscribir al observable porque si no no se dispara

    this.usuarioService.loginUsuario( usuario, formulario.value.recuerdame ).subscribe( resp => {

      console.log( 'loginUsuario: ', resp ); // Debemos obtener aquí true

      // Ahora podemos navegar al login, necesitamos importar Router e inyectarlo en el constructor como siempre
      this.router.navigate( [ '/dashboard' ] );

    } );

    // this.router.navigate( [ '/dashboard' ] );

  }

  googleInit() {

    /* Sacado de la documentación de Google Sign-in y adaptado, es importante usar función flecha para no perder this */

    gapi.load( 'auth2', () => {

      this.auth2 = gapi.auth2.init( {
        client_id: '739323640317-4kmd23u2jhvbbkscdikphk6p5pns2vd6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      } );

      this.attachSignIn( document.getElementById( 'btnGoogle' ) );

    } );

  }

  attachSignIn( element: any ) {

    /* Sacado de la documentación de Google Sign-in y adaptado, es importante usar función flecha para no perder this */

    this.auth2.attachClickHandler( element, {}, ( googleUser: any ) => {

      /* const profile = googleUser.getBasicProfile();

      console.log( profile ); */

      const token = googleUser.getAuthResponse().id_token;

      console.log( token );

      this.usuarioService.loginUsuarioGoogle( token ).subscribe( resp => {

        console.log( 'loginUsuarioGoogle: ', resp ); // Debemos obtener aquí true

        // Ahora podemos navegar al login, necesitamos importar Router e inyectarlo en el constructor como siempre
        // this.router.navigate( [ '/dashboard' ] );

        // Solución temporal a un bug de Angular
        this.ngZone.run( () => this.router.navigate( [ '/dashboard' ] ) ).then();

      } );

    } );

  }

}
