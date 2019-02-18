import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../components/material/material.module';
import { SiteUrlComponent } from './site-url.component';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: SiteUrlComponent,
    data: {
      title: 'Site URL'
    },
  }
];

@NgModule({
  declarations: [
    SiteUrlComponent,
    SafeUrlPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SiteUrlModule { }
