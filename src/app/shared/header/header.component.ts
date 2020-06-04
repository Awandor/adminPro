import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index'; // ojo a nuestro index de servicios
import { Router } from '@angular/router';

// Importamos el servicio de logout

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
} )
export class HeaderComponent implements OnInit {

  constructor( public usuarioService: UsuarioService, public router: Router ) { }

  ngOnInit(): void {
  }

  buscar( termino: string ) {

    console.log( termino );

    // Redireccionamos al buscador para ello necesitamos importar Router

    this.router.navigate( [ '/buscador', termino ] );

  }

}
