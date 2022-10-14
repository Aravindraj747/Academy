import { NgModule } from '@angular/core';

import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
