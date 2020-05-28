import { Injectable, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable( {
  providedIn: 'root'
} )
export class ModalUploadService {

  public tipo: string;

  public id: string;

  public img: string;

  public nombre: string;

  // Queremos poder emitir algo para que otros componentes que usan la modal se puedan suscribir y escuchar cuando se sube una imagen

  public notificacionSubidaImagen = new EventEmitter<any>(); // Emitirá la respuesta que vemos en Postman al subir una imagen

  constructor( private modalService: NgbModal ) {

    console.log( 'Modal upload service listo' );

  }

  /* mostrarModal( content: string, id: string, tipo: string ) {

    this.tipo = tipo;

    this.id = id;

    console.log( id );

    this.modalService.open( content, { ariaLabelledBy: 'modal-basic-title' } ).result.then( ( result ) => {
      // this.closeResult = `Closed with: ${ result }`;
    }, ( reason ) => {
      // this.closeResult = `Dismissed ${ this.getDismissReason( reason ) }`;
    } );
  } */

  mostrarModal( usuario: Usuario, tipo: string ) {

    this.tipo = tipo;

    this.id = usuario._id;

    this.img = usuario.img;

    this.nombre = usuario.nombre;

    // console.log( img );

  }

  ocultarModal() {

    const element = document.getElementById( 'modalCloseButton' );

    // console.log( element );

    element.click();

    this.tipo = null;

    this.id = null;

  }
}
