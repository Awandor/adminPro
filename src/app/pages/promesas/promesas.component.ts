import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {

    /* const promesa = new Promise( (resolve, reject) => {

      let contador = 0;

      // Si no detenemos el interval sigue ejecutándose indefinidamente, para ello lo igualamos a una variable y así podemos detenerlo

      const intervalo = setInterval( () => {

        contador += 1;

        console.log(contador);

        if ( contador === 3 ) {

          // reject( 'KO' );

          resolve( 'OK!!!' );

          // Detenemos el interval
          clearInterval(intervalo);

        }

      }, 1000 );

    } ); */

    /* promesa.then( ( mensaje ) => {

      console.log('Terminó', mensaje);

    } ).catch( error => console.log('Error en la promesa', error) ); */


    // Invocamos la función que retorna una promesa
    this.contarTres().then( ( mensaje ) => {

      console.log('Terminó', mensaje);

    } ).catch( error => console.log('Error en la promesa', error) );

  }

  // Es más común trabajar con funciones que retornan una promesa

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let contador = 0;

      // Si no detenemos el interval sigue ejecutándose indefinidamente, para ello lo igualamos a una variable y así podemos detenerlo

      const intervalo = setInterval( () => {

        contador += 1;

        console.log(contador);

        if ( contador === 3 ) {

          // reject( false );

          resolve( true );

          // Detenemos el interval
          clearInterval(intervalo);

        }

      }, 1000 );

    } );

  }

  ngOnInit(): void {
  }

}
