import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe( {
  name: 'imagen'
} )
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuarios' ): any {

    // Hemos establecido un valor por defecto para el tipo

    let url = environment.url_services + '/imagen.route';

    if ( !img ) {

      return url + '/usuarios/xxx'; // retorna la imagen 'no hay imagen'

    }

    // Comprobamos si la imagen viene de cuenta de Google

    if ( img.indexOf( 'https' ) >= 0 ) {

      return img;

    }

    switch ( tipo ) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'hospitales':
        url += '/hospitales/' + img;
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;

      default:
        console.log( 'tipo de imagen no existe, tienen que ser usuarios, hospitales, medicos' );
        return url + '/usuarios/xxx'; // retorna la imagen 'no hay imagen'
    }

    return url;

  }

}
