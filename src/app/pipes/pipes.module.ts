import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common'; No lo necesitamos ngIf
import { ImagenPipe } from './imagen.pipe';

// Para poder usar los pipes fuera de este módulo los exportamos

// Este módulo lo importamos donde vayamos a trabajar con los pipes, en pages.module y en shared.module donde está header

@NgModule( {
  declarations: [
    ImagenPipe
  ],
  imports: [
  ],
  exports: [
    ImagenPipe
  ]
} )
export class PipesModule { }
