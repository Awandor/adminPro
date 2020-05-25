import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  title = 'adminPro';

  // Con solo cargar SettingsService se dispara el constructor con el método cargarAjustes()

  constructor( public ajustesService: SettingsService ) {

  }

}
