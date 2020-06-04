import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscadorService } from '../../services/buscador/buscador.service';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from '../../models/usuario.model';

@Component( {
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
} )
export class BuscadorComponent implements OnInit {

  usuarios: Usuario[] = [];

  medicos: Medico[] = [];

  hospitales: Hospital[] = [];

  termino: string = '';

  constructor( public activatedRoute: ActivatedRoute, public buscadorService: BuscadorService ) {

    // Vamos a recibir el término de búsqueda por URL

    activatedRoute.params.subscribe( resp => {

      console.log( resp );

      const termino = resp.termino;

      this.buscar( termino );

    } );

  }

  ngOnInit(): void {
  }

  buscar( termino: string ) {

    this.buscadorService.obtenerTodo( termino ).subscribe( ( resp: any ) => {

      console.log( resp );

      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;

      this.termino = termino;

    } );

  }

}
