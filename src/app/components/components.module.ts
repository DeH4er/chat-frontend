import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent, LoadingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, ButtonComponent, LoadingComponent],
})
export class ComponentsModule {}
