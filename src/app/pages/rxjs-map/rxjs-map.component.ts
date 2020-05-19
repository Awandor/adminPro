import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-map',
  templateUrl: './rxjs-map.component.html',
  styles: [
  ]
})
export class RxjsMapComponent implements OnInit {

  miContador: number = 0;

  miRecibido: string = '';

  miMensaje: string = '';

  constructor() {

    // Lo interesante es aplicar el map a la declaración de la función y no cuando se invoca

    this.retornaObservable()/* .pipe( map( data => {

      return data.valor;

    } ) ) */
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

        // Imaginemos que estamos consumiendo el servicio de una API y que han cambiado el tipo del valor de salida a un objeto

        const salida = {
          valor: contador
        };

        this.miRecibido = JSON.stringify( salida );

        observer.next( salida );

        if ( contador === 3 ) {

          clearInterval( intervalo );

          observer.complete();

        }

      }, 1000 );

    } ).pipe( map( data => data.valor ) );
  }

}
