import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { BASE_ROUTES } from './base-layout-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ContentComponent } from './content/content.component';
import { MaterialModule } from '../components/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: AppNavComponent,
    data: { title: 'Site URL' },
    children: BASE_ROUTES
  }
];

@NgModule({
  declarations: [
    AppNavComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    MaterialModule
  ]
})
export class AppBaseLayoutModule { }
