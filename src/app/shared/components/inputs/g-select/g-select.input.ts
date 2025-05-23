import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-select',
  templateUrl: './g-select.input.html',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GSelectInputComponent),
      multi: true
    }
  ]
})
export class GSelectInputComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() validation = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() readOnly = false;
  @Input() isFilter = false;
  @Input() errorMessage = '';
  @Input() options: { id: string; strName: string }[] = [{ id: "", strName: '' }];

  private _value = 0;

  set value(val: number) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }
  }

  get value(): number {
    return this._value;
  }

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number): void {
    this._value = value;
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
}
