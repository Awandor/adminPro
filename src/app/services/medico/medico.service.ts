import { Injectable } from '@angular/core';

// Importamos el modelo de usuario que vamos a enviar al back-end
import { Medico } from '../../models/medico.model';

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
export class MedicoService {

  medico: Medico;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService,
    public usuarioService: UsuarioService
  ) {

    console.log( 'Servicio de medico listo' );

  }

  obtenerMedicos( desde: number = 0 ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/medico.route?desde=' + desde;

    return this.http.get( url, {} );

  }

  buscarMedicoConcreto( terminoBusqueda: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/busqueda.route/coleccion/medicos/' + terminoBusqueda;

    return this.http.get( url, {} ).pipe( map( ( resp: any ) => resp.medicos ) );

  }

  obtenerMedicoConcreto( id: string ) {

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/medico.route/' + id;

    return this.http.get( url, {} ).pipe( map( ( resp: any ) => resp.medico ) );

  }

  guardarMedico( medico: Medico ) {

    // console.log( 'Médico a guardar', medico );

    // console.log( 'medico._id', medico._id );

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    let url = environment.url_services + '/medico.route';

    if ( medico._id ) {

      // Actualizando médico PUT

      // console.log( 'Médico a actualizar', medico );

      url += '/' + medico._id + '?token=' + this.usuarioService.token;

      // Retornamos un observable al que nos podemos suscribir

      return this.http.put( url, medico ).pipe( map( ( resp: any ) => {

        console.log( 'Médico actualizado', resp );

        Swal.fire( {
          title: 'Médico actualizado',
          text: resp.medico.nombre,
          icon: 'success'
        } );

        return resp.medico;

      } ) );

    } else {

      // Creando médico POST

      // console.log( 'Médico a insertar', medico );

      url += '?token=' + this.usuarioService.token;

      // Retornamos un observable al que nos podemos suscribir

      return this.http.post( url, medico ).pipe( map( ( resp: any ) => {

        console.log( 'Médico añadido', resp );

        Swal.fire( {
          title: 'Médico añadido',
          text: resp.medico.nombre,
          icon: 'success'
        } );

        return resp.medico;

      } ) );

    }

  }

  borrarMedico( id: string ) {

    console.log( 'Médico a borrar', id );

    // Creamos variable url dependiendo del entorno si es producción o es desarrollo

    const url = environment.url_services + '/medico.route/' + id + '?token=' + this.usuarioService.token;

    console.log( 'Ruta enviada al back-end', url );

    // Retornamos un observable al que nos podemos suscribir

    return this.http.delete( url ).pipe( map( ( resp: any ) => {

      console.log( 'respuesta de back-end', resp );

      Swal.fire( {
        title: 'Médico borrado',
        text: resp.medico.nombre,
        icon: 'success'
      } );

      return true;

    } ) );

  }

  mostrarModal( medico: Medico, tipo: string ) {

    // this.tipo = tipo; console.log( 'mostrarModal: ', this.tipo );

    // this.id = usuario._id;

    this.medico.img = medico.img;

    // this.nombre = usuario.nombre;

    // console.log( img );

  }

}
