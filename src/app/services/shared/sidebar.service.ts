import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable( {
  providedIn: 'root'
} )
export class SidebarService {

  menu: any = [];

  /* menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress bar', url: '/progress' },
        { titulo: 'Diagramas', url: '/graficos1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'rxjs Observable - retry', url: '/rxjs' },
        { titulo: 'rxjs Observable - map', url: '/rxjs-map' },
        { titulo: 'rxjs Observable - filter', url: '/rxjs-filter' },
        { titulo: 'rxjs Observable - unsubscribe', url: '/rxjs-unsubscribe' },
      ]
    },
    {
      titulo: 'Administración',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Médicos', url: '/medicos' },
      ]
    }
  ]; */

  constructor( public usuarioService: UsuarioService ) {

    // El constructor se dispara sólo la primera vez, cada vez que se hace logout y login ya no se dispara
    // Vamos a meterlo en una función que llamaremos desde sidebar.component onInit

    // this.menu = usuarioService.menu;

  }

  cargarMenu() {

    this.menu = this.usuarioService.menu;

  }
}
