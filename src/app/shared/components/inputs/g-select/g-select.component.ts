import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-select',
  templateUrl: './g-select.component.html',
  standalone: false,
  host: { 'class': 'block w-full' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GSelectInput),
      multi: true
    }
  ]
})
export class GSelectInput implements ControlValueAccessor {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() validation = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() readOnly = false;
  @Input() isFilter = false;
  @Input() errorMessage = '';
  @Input() options: { id: string | number; strName: string }[] = [];

  _value: string | number = "";

  set value(val: string | number) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }
  }

  get value(): string | number {
    return this._value;
  }

  onChange: (value: string | number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this._value = value !== null && value !== undefined ? value : "";
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
