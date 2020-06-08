import { RouterModule, Routes } from '@angular/router';

// import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficos1Component } from '../pages/graficos1/graficos1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RxjsMapComponent } from './rxjs-map/rxjs-map.component';
import { RxjsFilterComponent } from './rxjs-filter/rxjs-filter.component';
import { RxjsUnsubscribeComponent } from './rxjs-unsubscribe/rxjs-unsubscribe.component';
import { ProfileComponent } from './profile/profile.component';
import { BuscadorComponent } from './buscador/buscador.component';

// Guards

// import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

// Administración

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

// Todas las rutas tienen una propiedad opcional llamada data que puede ser cualquier valor, objeto, arreglo, booleano
// lo mejor es siempre tratarlo como un objeto

// Vamos a añadir data para pasarla a breadcrumbs

// Usando children creamos rutas hijas que se pintan en <router-outlet></router-outlet> dentro de PagesComponent

/* const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress bar' } },
      { path: 'graficos1', component: Graficos1Component, data: { titulo: 'Diagramas' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs Observable - retry' } },
      { path: 'rxjs-map', component: RxjsMapComponent, data: { titulo: 'rxjs Observable - map' } },
      { path: 'rxjs-filter', component: RxjsFilterComponent, data: { titulo: 'rxjs Observable - filter' } },
      { path: 'rxjs-unsubscribe', component: RxjsUnsubscribeComponent, data: { titulo: 'rxjs Observable - unsubscribe' } },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil' } },
      { path: 'buscador/:termino', component: BuscadorComponent, data: { titulo: 'Resultado de búsqueda' } },
      // Administración
      { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Administración de Usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Administración de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Administración de Médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Administración de Médico' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
]; */

// Preparamos para Lazy Load

const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [ VerificaTokenGuard ], data: { titulo: 'Dashboard' } },
  // { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress bar' } },
  { path: 'graficos1', component: Graficos1Component, data: { titulo: 'Diagramas' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs Observable - retry' } },
  { path: 'rxjs-map', component: RxjsMapComponent, data: { titulo: 'rxjs Observable - map' } },
  { path: 'rxjs-filter', component: RxjsFilterComponent, data: { titulo: 'rxjs Observable - filter' } },
  { path: 'rxjs-unsubscribe', component: RxjsUnsubscribeComponent, data: { titulo: 'rxjs Observable - unsubscribe' } },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil' } },
  { path: 'buscador/:termino', component: BuscadorComponent, data: { titulo: 'Resultado de búsqueda' } },
  // Administración
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ VerificaTokenGuard, AdminGuard ], data: { titulo: 'Administración de Usuarios' } },
  {
    path: 'hospitales', component: HospitalesComponent, canActivate: [ VerificaTokenGuard ],
    data: { titulo: 'Administración de Hospitales' }
  },
  { path: 'medicos', component: MedicosComponent, canActivate: [ VerificaTokenGuard ], data: { titulo: 'Administración de Médicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Administración de Médico' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

// Usamos forChild que sólo espera un argumento, nada de useHash

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

// Lo importamos en pages.module
