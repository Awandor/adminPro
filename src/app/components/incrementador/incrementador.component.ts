import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // Con el decorador @Input() podemos recibir valores desde fuera, desde un padre

  // Si las variables con @Input() están seteadas con valores por defecto, esos serán los valores en el contructor

  // Si se reciben valores desde fuera esos valores estarán disponibles en ngOnInit

  @Input() porcentaje: number;

  // Podemos renombrar la variable a nombre y usar éste en el padre en vez de leyenda

  @Input('nombre') leyenda: string;

  // Para enviar datos al padre lo hacemos con eventos personalizados usando @Output() con tipo EventEmitter

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  // Vamos a usar el decorador @ViewChild que nos permite hacer referencia a elementos HTML del componente mediante #nombre en el elemento

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarPorcentaje( valor: number ) {

    if ( this.porcentaje >= 100 && valor > 0 ) {

      this.porcentaje = 100;

      return;

    }

    if ( this.porcentaje <= 0 && valor < 0 ) {

      this.porcentaje = 0;

      return;

    }

    this.porcentaje += valor;

    // Así se activa el emisor de eventos

    this.cambioValor.emit( this.porcentaje );

    // Llevamos el foco al input

    this.txtProgress.nativeElement.focus();

  }

  alCambiarInput( e: number ) {

    console.log('ngModelChange: ', e);

    // Vamos a hacer una referencia al elemento input para controlar lo que se puede escribir en él

    // getElementsByName retorna un arreglo de todos los elementos con ese nombre

    // const elemHTML: any = document.getElementsByName('porcentaje');

    // console.log('Input value: ', elemHTML[0].value);

    // Tenemos un problema al tener varios componentes con varios inputs con el mismo nombre

    // Hemos hecho una referencia al elemento ahora con el decorador @ViewChild que hemos llamado txtProgress

    console.log(this.txtProgress);

    if ( e >= 100 ) {

      this.porcentaje = 100;

    } else if ( e <=0 ) {

      this.porcentaje = 0;

    } else {

      this.porcentaje = e;

    }

    // elemHTML[0].value = this.porcentaje;

    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioValor.emit( this.porcentaje );

  }

}
