import { Component, OnInit } from '@angular/core';

// Para poder usar una función cargada desde el index.html usamos declare y luego la ejecutamos

declare function initPlugins(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    initPlugins();

  }

}
