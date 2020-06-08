import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, public router: Router ) { }

  canActivate(): Promise<boolean> | boolean {

    console.log( 'inicio de verifica token guard' );

    const token = this.usuarioService.token;

    // Vamos a hallar la fecha de expiración
    // Los token de jwb están codificados en base 64, con la función atob de js podemos decodificar

    console.log( token );

    const payload = JSON.parse( atob( token.split( '.' )[ 1 ] ) );

    console.log( payload );

    // La fecha está en segundos

    const expirado = this.verificaExpiracion( payload.exp );

    if ( expirado ) {

      console.log( 'el token ha expirado' );

      this.router.navigate( [ '/login' ] );

      return false;

    }

    // Si no ha expirado renovar el token en caso que sea necesario, vamos a usar una promesa

    console.log( 'Verificamos si hay que renovar el token' );

    return this.verificaRenovacion( payload.exp );

  }

  verificaExpiracion( fechaExpiracion: number ) {

    // getTime retorna en milisegundos

    const ahora = new Date().getTime() / 1000;

    if ( fechaExpiracion < ahora ) {

      return true;

    }

    return false;

  }

  // Hay que especificar que el método retorna una promesa de tipo booleano

  verificaRenovacion( fechaExpiracion: number ): Promise<boolean> {

    return new Promise( ( resolve, reject ) => {

      const tokenExp = new Date( fechaExpiracion * 1000 );

      const ahora = new Date(); // Para mayor seguridad podríamos traer la fecha actual del servidor

      // Pasamos ahora a tiempo y le sumamos 1 hora de gracia

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      console.log( tokenExp );
      console.log( ahora );

      if ( tokenExp.getTime() > ahora.getTime() ) {

        // Si no está próximo a expirar no hacemos nada

        const horasParaRenovarToken = ( tokenExp.getTime() - ahora.getTime() ) / ( 60 * 60 * 1000 );

        console.log( `aun faltan ${ horasParaRenovarToken } horas para que expire el token` );

        resolve( true );

      } else {

        console.log( 'Renovamos el token' );

        this.usuarioService.renuevaToken().subscribe( () => {

          resolve( true );

        }, () => {

          // En caso de error

          console.log( 'Error al tratar de renovar el token' );

          this.router.navigate( [ '/login' ] );

          reject( false );

        } );

      }

    } );

  }

}
