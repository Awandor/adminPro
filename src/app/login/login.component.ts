import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Para poder usar una función cargada desde el index.html usamos declare y luego la ejecutamos

declare function initPlugins(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {

    initPlugins();

  }

  ingresar() {

    console.log('ingresando...');

    this.router.navigate( [ '/dashboard' ] );

  }

}
