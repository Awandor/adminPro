import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  porcentaje1: number = 50;

  porcentaje2: number = 30;

  leyenda: string = 'leyenda';

  algo: number;

  constructor() { }

  ngOnInit(): void {
    console.log(this.algo);
  }

  actualizarPorcentaje( e: number ) {

    console.log(e);

    this.porcentaje1 = e;

  }

  /* actualizarPorcentaje2( e: number ) {

    console.log(e);

    this.porcentaje2 = e;

  } */

}
