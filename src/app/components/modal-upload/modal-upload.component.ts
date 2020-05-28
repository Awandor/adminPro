import { Component, OnInit } from '@angular/core';

// import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component( {
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
} )
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;

  imagenTemp: string | ArrayBuffer;

  constructor( public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService ) {

    console.log( 'Modal lista' );

  }

  ngOnInit(): void {

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

  subirImagen() {

    // ¿Cómo conseguir el _id? Crearemos un componente intermedio modal-upload.service

    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id )
      .then( resp => {

        // Cerrar modal

        console.log( 'Queremos cerrar modal' );

        const modal: any = document.getElementById( 'imageModal' );

        modal.modal( 'hide' );

      } )
      .catch( err => {

        console.log( 'Error al subir la imagen', err );

      } );

  }

}
