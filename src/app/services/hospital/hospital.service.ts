import { Injectable } from '@angular/core';

// Importamos el modelo de usuario que vamos a enviar al back-end
import { Hospital } from '../../models/hospital.model';

// Importamos las variables de entorno

import { environment } from 'src/environments/environment';

// Importamos HttpClient para poder hacer peticiones http

// También tenemos que importar el HttpClient en services.module

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Importamos Router para poder navegar
import { Router } from '@angular/router';

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service'; // ojo a nuestro index de servicios, error cíclico?
import { UsuarioService } from '../usuario/usuario.service';

@Injectable( {
  providedIn: 'root'
} )
export class HospitalService {

  hospital: Hospital;

  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService,
    public usuarioService: UsuarioService
  ) {

    console.log( 'Servicio de hospital listo' );

  }

  obtenerHospitalesPaginacion( desde: number = 0 ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/hospital.route?desde=' + desde;

    return this.http.get( url, {} );

  }

  obtenerHospitales() {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/hospital.route/todos';

    return this.http.get( url, {} );

  }

  buscarhospitalConcreto( terminoBusqueda: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/busqueda.route/coleccion/hospitales/' + terminoBusqueda;

    return this.http.get( url, {} ).pipe( map( ( resp: any ) => resp.hospitales ) );

  }

  obtenerHospitalPorId( id: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/hospital.route/' + id;

    return this.http.get( url, {} ).pipe( map( ( resp: any ) => resp.hospital ) );

  }

  borrarHospital( id: string ) {

    console.log( 'Hospital a borrar', id );

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/hospital.route/' + id + '?token=' + this.usuarioService.token;

    console.log( 'Ruta enviada al back-end', url );

    // Retornamos un observable al que nos podemos suscribir

    return this.http.delete( url ).pipe( map( ( resp: any ) => {

      console.log( 'respuesta de back-end', resp );

      Swal.fire( {
        title: 'Hospital borrado',
        text: resp.hospital.nombre,
        icon: 'success'
      } );

      return true;

    } ) );

  }

  actualizarHospital( hospital: Hospital ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/hospital.route/' + hospital._id + '?token=' + this.usuarioService.token;

    // Retornamos un observable al que nos podemos suscribir

    return this.http.put( url, hospital ).pipe( map( ( resp: any ) => {

      // console.log( 'respuesta del suscriptor', resp );

      Swal.fire( {
        title: 'Hospital actualizado',
        text: hospital.nombre,
        icon: 'success'
      } );

      return true;

    } ) );

  }

  crearHospital( nombre: string ) {

    const hospital = new Hospital(
      nombre
    );

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/hospital.route' + '?token=' + this.usuarioService.token;

    // Retornamos un observable al que nos podemos suscribir

    return this.http.post( url, hospital ).pipe( map( ( resp: any ) => {

      // console.log( resp );

      return resp;

    } ) );

  }

}
