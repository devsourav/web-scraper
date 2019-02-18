import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../components/material/material.module';
import { PickerSetsComponent } from './picker-sets.component';
import { PickerDialogComponent } from '../../components/material/picker-dialog/picker-dialog.component';
import { PickerSetService } from '../../services/picker-set.service';

const routes: Routes = [
  {
    path: '',
    component: PickerSetsComponent,
    data: {
      title: 'Picker Sets'
    },
  }
];

@NgModule({
  declarations: [
    PickerSetsComponent,
    PickerDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [PickerDialogComponent],
  exports: [RouterModule],
  providers: [PickerSetService]

})
export class PickerSetsModule { }
