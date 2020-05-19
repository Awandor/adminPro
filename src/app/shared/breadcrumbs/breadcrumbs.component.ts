import { Component, OnInit } from '@angular/core';

// Para acceder a los títulos de las páginas que están en las rutas tenemos que importar Router
import { Router, ActivationEnd } from '@angular/router';

import { filter, map } from 'rxjs/operators';

// Para cambiar el título de la webpage importamos Title
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  tituloPagina: string = '';

  constructor( private router: Router, private title: Title, private meta: Meta ) {

    // Router tiene un Observable llamado events que puede retornar muchas cosas, nos suscribimos a él

    /* router.events.subscribe( event => {

      console.log(event);

    } ); */

    // Vamos a pasar la respuesta por un pipe con varios operadores

    this.obtenerTituloPaginaDeRoutas();

  }

  ngOnInit(): void {
  }

  obtenerTituloPaginaDeRoutas() {

    this.router.events.pipe(
      filter( event => {

        return event instanceof ActivationEnd;

      }),
      filter( (event: ActivationEnd) => {

        return event.snapshot.firstChild === null;

      }),
      map( event => event.snapshot.data.titulo )
    )
    .subscribe( data => {

      console.log(data);

      this.tituloPagina = data;

      this.title.setTitle(data);

      this.meta.addTag( { name: 'description', content: data } );

      // También podemos usar el tipo MetaDefinition de Angular que nos ayuda con las propiedades del objeto

      const algo: MetaDefinition = {
        name: 'author', content: 'Dan Anders Häggblom'
      };

      this.meta.addTag(algo);

    } );

  }

}
