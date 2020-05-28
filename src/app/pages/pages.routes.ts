import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficos1Component } from '../pages/graficos1/graficos1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RxjsMapComponent } from './rxjs-map/rxjs-map.component';
import { RxjsFilterComponent } from './rxjs-filter/rxjs-filter.component';
import { RxjsUnsubscribeComponent } from './rxjs-unsubscribe/rxjs-unsubscribe.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
// Administración
import { UsuariosComponent } from './usuarios/usuarios.component';

// Todas las rutas tienen una propiedad opcional llamada data que puede ser cualquier valor, objeto, arreglo, booleano
// lo mejor es siempre tratarlo como un objeto

// Vamos a añadir data para pasarla a breadcrumbs

const pagesRoutes: Routes = [
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
      // Administración
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Administración de Usuarios' } },
      /* { path: 'hospitales', component: UsuariosComponent, data: { titulo: 'Administración Hospitales' } },
      { path: 'medicos', component: UsuariosComponent, data: { titulo: 'Administración de Médicos' } }, */
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];

// Usamos forChild que sólo espera un argumento, nada de useHash

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

// Lo importamos en pages.module
