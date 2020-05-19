import { NgModule } from '@angular/core';

// Módulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { ChartsModule } from 'ng2-charts';


// Components
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficos1Component } from '../pages/graficos1/graficos1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RxjsMapComponent } from './rxjs-map/rxjs-map.component';
import { RxjsFilterComponent } from './rxjs-filter/rxjs-filter.component';
import { RxjsUnsubscribeComponent } from './rxjs-unsubscribe/rxjs-unsubscribe.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficos1Component,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        RxjsMapComponent,
        RxjsFilterComponent,
        RxjsUnsubscribeComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficos1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ComponentsModule,
        ChartsModule
    ]
  })
  export class PagesModule { }
