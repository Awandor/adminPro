import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';

import { LoginGuardGuard } from './services/service.index';

// Para usar Lazy Load usamos loadChildren en vez de children

// loadChildren se hace con una función anónima

// En nuestro caso es pages.module y la segunda parte es el nombre de la clase del módulo PagesModule

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '', component: PagesComponent, canActivate: [ LoginGuardGuard ], loadChildren: './pages/pages.module#PagesModule' },
  {
    path: '', component: PagesComponent, canActivate: [ LoginGuardGuard ],
    loadChildren: () => import( './pages/pages.module' ).then( module => module.PagesModule )
  },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
