import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatFormFieldModule, MatIconModule],
  exports: [MatFormFieldModule, MatIconModule]
})
export class MaterialModule { }
