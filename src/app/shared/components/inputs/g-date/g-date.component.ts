import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-date',
  templateUrl: './g-date.component.html',
  standalone: false,
  host: { 'class': 'block w-full' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GDateInput),
      multi: true
    }
  ],
})
export class GDateInput implements ControlValueAccessor, OnInit {
  
  @Input() name!: string;
  @Input() label!: string;
  @Input() placeholder: string = 'Seleccione una fecha';
  @Input() validation: boolean = false;
  @Input() errorMessage: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;

  _value: string = '';

  onChange: (value: Date | string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    // We remove _setInitialValue() so it doesn't force a date by default
    // and desync with the parent component's model (e.g. sale-history).
  }

  private _setInitialValue() {
    const today = new Date();
    this._value = this._getLocalDateString(today);
    this.onChange(this._value);
  }

  writeValue(value: Date | string | null): void {
    if (value) {
      this._value = this._parseDate(value);
    } else {
      this._value = '';
    }
  }

  registerOnChange(fn: (value: Date | string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this._value = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }

  private _parseDate(value: Date | string): string {
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return this._getLocalDateString(date);
      }
    } catch (error) {}
    return this._getLocalDateString(new Date());
  }

  private _getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}