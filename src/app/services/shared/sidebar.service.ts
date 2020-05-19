import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
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
    }
  ];

  constructor() { }
}
