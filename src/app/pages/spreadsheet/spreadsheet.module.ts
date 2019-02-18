import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpreadsheetComponent } from './spreadsheet.component';
import { MaterialModule } from '../../components/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: SpreadsheetComponent,
    data: {
      title: 'Spreadsheet'
    },
  }
];

@NgModule({
  declarations: [SpreadsheetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SpreadsheetModule { }
