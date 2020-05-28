import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

// Components
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDoughnutComponent } from './grafico-doughnut/grafico-doughnut.component';


@NgModule( {
  declarations: [
    IncrementadorComponent,
    GraficoDoughnutComponent,
  ],
  exports: [
    IncrementadorComponent,
    GraficoDoughnutComponent,
    ChartsModule
  ],
  imports: [
    FormsModule,
    ChartsModule
  ]
} )
export class ComponentsModule { }
