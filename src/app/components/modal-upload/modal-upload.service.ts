import { Injectable, EventEmitter } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public modalOculto: string = '';

  // Queremos poder emitir algo para que otros componentes que usan la modal se puedan suscribir y escuchar cuando se sube una imagen

  public notificacionSubidaImagen = new EventEmitter<any>(); // Emitirá la respuesta que vemos en Postman al subir una imagen

  constructor() {

    console.log( 'Modal upload service listo' );

  }

  mostrarModal( id: string, tipo: string ) {

    this.tipo = tipo;

    this.id = id;

    console.log( id );
  }
}
