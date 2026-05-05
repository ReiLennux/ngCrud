import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

export interface FilterOption {
  id: string | number;
  strName: string;
}

export interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: FilterOption[];
  placeholder?: string;
  icon?: string;
  gridColSpan?: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  standalone: false
})
export class FiltersComponent implements OnChanges, OnDestroy {
  @Input() fields: FilterField[] = [];
  @Output() filterChange = new EventEmitter<any>();

  filterForm: FormGroup;
  private sub?: Subscription;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] && this.fields) {
      this.initForm();
    }
  }

  initForm() {
    this.sub?.unsubscribe();
    
    const group: any = {};
    this.fields.forEach(field => {
      group[field.key] = [''];
    });
    this.filterForm = this.fb.group(group);

    this.sub = this.filterForm.valueChanges.pipe(
      debounceTime(50) // Small debounce to avoid multiple triggers on init
    ).subscribe(values => {
      this.filterChange.emit(values);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
