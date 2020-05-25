import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// Importamos el servicio cuidado con la ruta queremos usar nuestor service.index
import { UsuarioService } from '../services/service.index';

// Importamos el modelo del Usuario
import { Usuario } from '../models/usuario.model';

// Importamos Router para poder navegar
import { Router } from '@angular/router';

// Para poder usar una función cargada desde el index.html usamos declare y luego la ejecutamos

declare function initPlugins(): void;

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ '../login/login.component.css' ],
} )
export class RegisterComponent implements OnInit {

  // Vamos a trabajar con un Reactive Form

  formulario: FormGroup;

  constructor( public usuarioService: UsuarioService, public router: Router ) { }

  ngOnInit(): void {
    initPlugins();

    this.formulario = new FormGroup( {
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl(),
    }, { validators: this.passwordsNoSonIguales } );

    this.formulario.setValue( {
      nombre: 'Test1',
      correo: 'test1@test.es',
      password: '123456',
      password2: '123456',
      condiciones: true
    } );

  }

  // con FormControl podemos hacer validaciones personalizadas por campos o por formulario entero

  // validators espera una función, si no recibe parámetros no se invoca pero como recibe hay invocar

  passwordsNoSonIguales( group: FormGroup ) {

    const password = group.get( 'password' ).value;

    const password2 = group.get( 'password2' ).value;

    if ( password === password2 ) {

      return null;

    }

    return {

      passwordsNoSonIguales: true

    };

  }

  registrarUsuario() {

    if ( this.formulario.invalid ) {

      return;

    }

    if ( !this.formulario.value.condiciones ) {

      console.log( 'Debe de aceptar las condiciones' );

      Swal.fire( {
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
        icon: 'error'
      } );

      return;

    }

    // console.log( this.formulario.value );

    // console.log( this.formulario.valid );

    const usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password
    );

    // Llamamos al servicio, nos tenemos que suscribir al observable porque si no no se dispara

    this.usuarioService.crearUsuario( usuario ).subscribe( resp => {

      console.log( 'crearUsuario: ', resp );

      // Ahora podemos navegar al login, necesitamos importar Router e inyectarlo en el constructor como siempre
      this.router.navigate( [ '/login' ] );

    } );

  }

}
