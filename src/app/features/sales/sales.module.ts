import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PrincipalSalesComponent } from './principal-sales/principal-sales.component';
import { SecondarySalesComponent } from './secondary-sales/secondary-sales.component';
import { ActionsSalesComponent } from './secondary-sales/actions-sales/actions-sales.component';

const routes: Routes = [
  { path: '', component: PrincipalSalesComponent },
  { path: 'register', component: SecondarySalesComponent }
];

@NgModule({
  declarations: [
    PrincipalSalesComponent,
    SecondarySalesComponent,
    ActionsSalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
