import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    },
  }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsModule { }
