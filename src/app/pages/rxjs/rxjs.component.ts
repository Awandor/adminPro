import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';

/* RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables
that makes it easier to compose asynchronous or callback-based code.
Converting existing code for async operations into observables.
Iterating through the values in a stream.
Mapping values to different types
Filtering streams
Composing multiple streams */

@Component( {
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
} )
export class RxjsComponent implements OnInit {

  miContador: number = 0;

  miMensaje: string = '';

  constructor() {

    // En un observable no tenemos argumentos como respose, reject, sólo tenemos un objeto observer de tipo subscriber
    // No hace falta especificar el tipo

    /* const observable = new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        // next es una función del observable que notifica cosas

        observer.next( contador );

        if ( contador === 3 ) {

          // Paramos el intervalo, pero el observable sigue observando hasta el infinito

          clearInterval( intervalo );

          // Detenemos el observable con complete() no recibe argumentos, simplemente lo detiene

          observer.complete();

        }

        if ( contador === 2 ) {

          // clearInterval( intervalo );
          observer.error( 'No se acepta el valor ' + contador );

        }

      }, 1000 );

    } ); */

    // Me suscribo al observable, es en este momento en que se invoca, los subscribe tienen 3 callbacks
    // el valor enviado por next, el valor de error, y complete que no recibe valor

    /* observable.subscribe( numero => {

      console.log('Subs ', numero);

    }, error => {

      console.error('Error en el observable', error);

    }, () => {

      console.log('El observador terminó de observar');

    } ); */

    // Los Observables tienen el método pipe que permite transformar los datos de diferentes maneras, recibe como argumentos
    // una serie de operadores, uno de ellos es retry, los operadores hay que importarlos

    // Si no le pasamos argumento a retry lo intentará hasta el infinito,

    // Como hemos comentado la línea clearInterval( intervalo ); cuando contador vale 2 se dispara el error y como el intervalo
    // sigue, cuando se ejecuta el primer reintento contador vale 3 y finaliza el proceso con éxito

    // observable.pipe( retry( 2 ) )
    this.retornaObservable().pipe( retry( 2 ) )
      .subscribe( numero => {

        console.log( 'Subs ', numero );
        this.miContador = numero;

      }, error => {

        console.error( 'Error en el observable', error );
        this.miMensaje = 'Error en el observable' + error;

      }, () => {

        console.log( 'El observador terminó de observar' );
        this.miMensaje = 'El observador terminó de observar'

      } );

  }

  ngOnInit(): void {
  }

  // FUNCIONES QUE RETORNAN OBSERVABLES
  // Normalmente no ponemos mucha lógica en el constructor, éste simplemente ejecuta funciones definidas en otros lugares
  // Creamos una función que retorna un observable y podemos decir que es de tipo Observable pero tenemos que especificar
  // también el tipo del valor que se retorna

  retornaObservable(): Observable<number> {

    return new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        // next es una función del observable que notifica cosas

        observer.next( contador );

        if ( contador === 3 ) {

          // Paramos el intervalo, pero el observable sigue observando hasta el infinito

          clearInterval( intervalo );

          // Detenemos el observable con complete() no recibe argumentos, simplemente lo detiene

          observer.complete();

        }

        if ( contador === 2 ) {

          // clearInterval( intervalo );
          observer.error( 'No se acepta el valor ' + contador );

        }

      }, 1000 );

    } );
  }

}
