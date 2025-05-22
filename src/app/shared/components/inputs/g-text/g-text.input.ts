/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-text',
  templateUrl: './g-text.input.html',
  standalone: false,
  styleUrls: ['./g-text.input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GTextInput),
      multi: true
    }
  ]
})
export class GTextInput implements ControlValueAccessor {
  @Input() value = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() validation = false;
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() minLength = 0;
  @Input() maxLength = 255;
  @Input() label = '';
  @Input() readOnly = false;
  @Input() errorMessage = '';
  
  @Output() valueChange = new EventEmitter<string>();

  onChange = (value: string) => {
    this.value = value;
  };
  onTouched: () => void = () => {
    return;
  };

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }
}
