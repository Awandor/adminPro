import { Component, OnInit } from '@angular/core';

// Para poder usar una función cargada desde el index.html usamos declare y luego la ejecutamos

declare function initPlugins(): void;

@Component( {
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [
  ]
} )
export class NopagefoundComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {

    initPlugins();

  }

}
