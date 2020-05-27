import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class SubirArchivoService {

  constructor() { }

  // Angular a partir de la versión 8 ofrece la posibilidad de subir archivos con HttpClientModule

  // Aquí lo hacemos con javaScript puro

  subirArchivo( archivo: File, tipo: string, id: string ) {

    // Creamos nuestro form data que es lo que vamos a subir por Ajax

    /* const formData = new FormData();

    const xhr = new XMLHttpRequest();

    formData.append( 'imagen', archivo, archivo.name );

    console.log( formData );

    xhr.onreadystatechange = () => {

      // Voy a recibir información cada vez que el estado cambie

      if ( xhr.readyState === 4 ) {

        if ( xhr.status === 200 ) {

          console.log( 'Imagen subida al servidor' );

        }

      }

    }; */

    // Vamos a hacerlo con una promesa para notificar

    return new Promise( ( resolve, reject ) => {

      const formData = new FormData();

      const xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      console.log( 'formData: ', formData );

      xhr.onreadystatechange = () => {

        // Voy a recibir información cada vez que el estado cambie

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {

            console.log( 'Imagen subida al servidor' );

            resolve( xhr.response );

          } else {

            console.log( 'Error subiendo imagen al servidor' );

            reject( xhr.response );

          }

        }

      };

      const url = environment.url_services + '/upload.route/' + tipo + '/' + id;

      xhr.open( 'PUT', url, true );

      xhr.send( formData );

    } );

  }
}
