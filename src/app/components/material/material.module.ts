import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { PickerDialogComponent } from './picker-dialog/picker-dialog.component';
import {
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatSortModule,
  MatTableModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatStepperModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  // MatSnackBarModule,
  MatGridListModule,
  MatFormFieldModule,
  MatExpansionModule,

} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    // MatSnackBarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    // MatSnackBarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
