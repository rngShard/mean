import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatMenuModule,
  MatTabsModule,
  MatDividerModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTreeModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatSelectModule,
} from '@angular/material';

const modules = [
  CommonModule,
  MatToolbarModule,
  MatMenuModule,
  MatTabsModule,
  MatDividerModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  FormsModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatTreeModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatSelectModule,
  FlexLayoutModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: [],
})
export class SharedModule {}
