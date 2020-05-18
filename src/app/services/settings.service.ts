import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Ajustes {
  temaUrl: string;
  tema: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };

  constructor( @Inject( DOCUMENT ) private _DOCUMENT ) {

    // console.log(_DOCUMENT);

    this.cargarAjustes();

  }

  guardarAjustes() {

    // localStorage sólo puede guardar strings y ajustes es un objeto, lo convertimos en un string

    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ) );

    // console.log('Ajustes guardados en local storage');

  }

  cargarAjustes() {

    if ( localStorage.getItem( 'ajustes' ) ) {

      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) );

      // console.log('Ajustes cargados del local storage');

      this.aplicarTema( this.ajustes.tema );

    } else {

      // console.log('Ajustes por defecto');

    }

  }

  aplicarTema( tema: string ) {

    const url = `assets/css/colors/${ tema }.css`;

    this._DOCUMENT.getElementById('theme').setAttribute('href', url);

    // Guardamos los cambios en local storage con el servicio ajustesService

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }

}
