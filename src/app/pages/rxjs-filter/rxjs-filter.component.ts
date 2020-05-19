import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-filter',
  templateUrl: './rxjs-filter.component.html',
  styles: [
  ]
})
export class RxjsFilterComponent implements OnInit {

  miContador: number = 0;

  miIndex: number = 0;

  miMensaje: string = '';

  constructor() {

    this.retornaObservable()
    .subscribe( numero => {

      console.log('Subs ', numero);
      this.miContador = numero;

    }, error => {

      console.error('Error en el observable', error);
      this.miMensaje = 'Error en el observable' + error;

    }, () => {

      console.log('El observador terminó de observar');
      this.miMensaje = 'El observador terminó de observar'

    } );

  }

  ngOnInit(): void {
  }

  retornaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        // Imaginemos que estamos consumiendo el servicio de una API y que sólo nos interesan los valores pares

        const salida = {
          valor: contador
        }

        observer.next( salida );

        if ( contador === 10 ) {

          clearInterval( intervalo );

          observer.complete();

        }

      }, 1000 );

    } ).pipe( map( data => data.valor ), filter( (data, index) => {

      // El operador filter es como un iterruptor que forzosamente debe retornar un booleano
      // Si es true se cumple la lógica de filtrado y el valor no sale, es filtrado
      // Recibe dos argumentos: el valor e index

      console.log('index: ', index);

      this.miIndex = index;

      return ( ( data % 2 ) !== 1 );

    } ) );
  }

}
