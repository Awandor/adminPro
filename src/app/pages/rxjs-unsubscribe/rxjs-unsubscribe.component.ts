import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Unsubscribable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-unsubscribe',
  templateUrl: './rxjs-unsubscribe.component.html',
  styles: [
  ]
})
export class RxjsUnsubscribeComponent implements OnInit, OnDestroy {

  miContador: number = 0;

  miIndex: number = 0;

  miMensaje: string = '';

  // No se puede desuscribir directamente del Observable tenemos que crear una referencia a la suscripción importando el tipo Subscription
  // e igualándola después a la suscripción del Observable

  suscripcion: Subscription;

  constructor() {

    this.suscripcion = this.retornaObservable()
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

  ngOnDestroy(): void {

    console.log('página abandonada');

    this.suscripcion.unsubscribe();

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
