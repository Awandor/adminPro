import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficos1Component } from '../pages/graficos1/graficos1.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficos1', component: Graficos1Component },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

// Usamos forChild que sólo espera un argumento, nada de useHash

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

// Lo importamos en pages.module
