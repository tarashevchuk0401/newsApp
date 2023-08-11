import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  exports:[
    MatButtonModule,
    MatCardModule
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MaterialsModule { }
