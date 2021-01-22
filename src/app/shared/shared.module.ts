import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';

const modules = [ComponentsModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
