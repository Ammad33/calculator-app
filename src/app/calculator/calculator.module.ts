import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [CommonModule, FormsModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
