import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable( {
  providedIn: 'root'
} )
export class BuscadorService {

  constructor( public http: HttpClient ) { }

  obtenerTodo( termino: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/busqueda.route/todo/' + termino;

    return this.http.get( url, {} );

  }

}
