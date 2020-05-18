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
      ]
    }
  ];

  constructor() { }
}
