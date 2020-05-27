import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index'; // ojo a nuestro index de servicios
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
} )
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: string | ArrayBuffer;

  constructor( public usuarioService: UsuarioService ) {

    // Recibimos todos los datos del usuario

    this.usuario = usuarioService.usuario;

    // console.log( this.usuario );

  }

  ngOnInit(): void {
  }

  enviarFormulario( usuario: Usuario ) {

    // console.log( 'enviarFormulario: ', usuario );

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {

      this.usuario.email = usuario.email;

    }

    this.usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => {

      // console.log( 'actualizarUsuario: ', resp ); // Debemos obtener aquí true

      // Ahora podemos navegar al login, necesitamos importar Router e inyectarlo en el constructor como siempre
      // this.router.navigate( [ '/dashboard' ] );

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

    this.usuarioService.prepararSubirArchivo( this.imagenSubir, this.usuario._id );

  }

}
