import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  input: string = '';
  result: string = '';

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  onNumberClick(value: string): void {
    this.input += value;
    this.inputField.nativeElement.focus();
  }

  onOperatorClick(operator: string): void {
    if (this.input.length === 0) {
      this.input += `0${operator}`;
    } else if (!this.isOperator(this.input.slice(-1))) {
      this.input += operator;
    }
    this.inputField.nativeElement.focus();
  }

  onDecimalClick(): void {
    const segments = this.input.split(/[\+\-\*\/]/);
    const currentSegment = segments[segments.length - 1];
    if (!currentSegment.includes('.')) {
      this.input += currentSegment === '' ? '0.' : '.';
    }
    this.inputField.nativeElement.focus();
  }

  onClear(): void {
    this.input = '';
    this.result = '';
    this.inputField.nativeElement.focus();
  }

  onBackspace(): void {
    if (this.input.length > 0) {
      this.input = this.input.slice(0, -1);
    }
    this.inputField.nativeElement.focus();
  }

  onEqualClick(): void {
    try {
      if (this.input.trim() === '') {
        throw new Error('Input is empty');
      }

      if (this.isOperator(this.input.trim().slice(-1))) {
        throw new Error('Invalid expression');
      }

      const sanitizedInput = this.input.replace(/[^-()\d/*+.]/g, '');
      this.result = eval(sanitizedInput).toString();

      if (this.result === 'Infinity' || this.result === '-Infinity') {
        throw new Error('Cannot divide by zero');
      }
    } catch (error: any) {
      this.result = error.message;
    } finally {
      this.inputField.nativeElement.focus();
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      this.onNumberClick(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.onOperatorClick(key);
    } else if (key === '.') {
      this.onDecimalClick();
    } else if (key === 'Enter') {
      this.onEqualClick();
    } else if (key === 'Backspace') {
      this.onBackspace();
    } else if (key === 'Escape') {
      this.onClear();
    }
  }

  private isOperator(value: string): boolean {
    return ['+', '-', '*', '/'].includes(value.trim());
  }
}
