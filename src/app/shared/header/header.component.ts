import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index'; // ojo a nuestro index de servicios

// Importamos el servicio de logout

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
} )
export class HeaderComponent implements OnInit {

  constructor( public usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

}
