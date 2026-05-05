import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { GTextAreaInput } from './components/inputs/g-text-area/g-text-area.component';
import { GTextInput } from './components/inputs/g-text/g-text.component';
import { GDateInput } from './components/inputs/g-date/g-date.component';
import { GSelectInput } from './components/inputs/g-select/g-select.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GPaginatorComponent } from './components/pagination/g-paginator/g-paginator.component';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    GTextAreaInput,
    GTextInput,
    GDateInput,
    GSelectInput,
    NavigationComponent,
    GPaginatorComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GTextAreaInput,
    GTextInput,
    GDateInput,
    GSelectInput,
    NavigationComponent,
    GPaginatorComponent,
    FiltersComponent
  ]
})
export class SharedModule { }
