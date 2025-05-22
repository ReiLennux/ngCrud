import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-g-date',
  templateUrl: './g-date.input.html',
  standalone: false,
  styleUrls: ['./g-date.input.css'],
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

  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnInit() {
    if (!this._value) {
      this._setInitialValue();
    }
  }

  private _setInitialValue() {
    const today = new Date();
    this._value = this._getLocalDateString(today);
    this.onChange(today);
  }

  writeValue(value: any): void {
    if (value) {
      this._value = this._parseDate(value);
    } else {
      this._value = this._getLocalDateString(new Date());
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this._value = inputValue;
    const date = new Date(inputValue);
    this.onChange(date);
    this.onTouched();
  }

  private _parseDate(value: any): string {
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