import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // directivas como ngFor, pipes
import { PipesModule } from '../pipes/pipes.module';

// Components
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';



@NgModule( {
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent
  ]
} )
export class SharedModule { }
