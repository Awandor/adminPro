import { Injectable } from '@angular/core';
import { CanActivate, /* Router */ } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable( {
  providedIn: 'root'
} )
export class AdminGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, /* public router: Router */ ) {

  }

  canActivate() {

    if ( this.usuarioService.usuario.role === 'ADMIN_ROLE' ) {

      console.log( 'Pasó el admin guard, es un administrador!' );

      return true;

    }

    console.log( 'Bloquedo por ADMIN GUARD, no es un administrador' );

    // this.router.navigate( [ '/login' ] );

    // Otra manera de hacerlo

    this.usuarioService.logout();

    return false;

  }

}
