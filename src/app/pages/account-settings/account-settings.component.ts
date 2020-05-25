import { Component, OnInit/* , Inject */ } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings/settings.service';

@Component( {
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
} )
export class AccountSettingsComponent implements OnInit {

  constructor( /* @Inject( DOCUMENT ) private _DOCUMENT, */ public ajustesService: SettingsService ) {

    /* console.log(_DOCUMENT);

    this.ajustesService.cargarAjustes(); */

  }

  ngOnInit(): void {

    this.aplicarCheckedLocalSorage();

  }

  cambiarTema( tema: string, ref: any ) {

    // console.log(tema);

    // console.log(ref);

    this.aplicarChecked( ref );

    /* const url = `assets/css/colors/${ tema }.css`;

    this._DOCUMENT.getElementById('theme').setAttribute('href', url);

    // Guardamos los cambios en local storage con el servicio ajustesService

    this.ajustesService.ajustes.tema = tema;
    this.ajustesService.ajustes.temaUrl = url;

    this.ajustesService.guardarAjustes(); */

    this.ajustesService.aplicarTema( tema );

  }

  // Añadimos referencias por # a todos los enlaces

  aplicarChecked( ref: any ) {

    const selectores: any = document.getElementsByClassName( 'selector' ); // Esto es un arreglo

    // console.log('selectores: ', selectores);

    // Recorremos el arreglo

    for ( const selector of selectores ) {

      // Quitamos la clase working de todos los elementos con la clase selector

      selector.classList.remove( 'working' );

      // Ahora añadimos la clase working a ref

      ref.classList.add( 'working' );

    }

  }

  aplicarCheckedLocalSorage() {

    const selectores: any = document.getElementsByClassName( 'selector' ); // Esto es un arreglo

    for ( const selector of selectores ) {

      if ( selector.getAttribute( 'data-theme' ) === this.ajustesService.ajustes.tema ) {

        selector.classList.add( 'working' );

        break; // IMPORTANTE

      }

    }

  }

}
