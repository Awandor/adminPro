import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';
// import { UsuarioService } from '../../services/service.index'; // Crea una dependencia circular, un warning

@Injectable( {
  providedIn: 'root'
} )
export class LoginGuardGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, public router: Router ) {

  }

  canActivate() {

    if ( this.usuarioService.estaLogueado() ) {

      console.log( 'Pasó el guard, está logueado!' );

      return true;

    } else {

      console.log( 'Detenido por el guard!!! Redirigido a Login' );

      this.router.navigate( [ '/login' ] );

      return false;

    }

  }

}
