import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { SalePosComponent } from './sale-pos/sale-pos.component';
import { SaleHistoryComponent } from './sale-history/sale-history.component';
import { ActionsSalesComponent } from './sale-history/actions-sales/actions-sales.component';

const routes: Routes = [
  { path: '', component: SalePosComponent },
  { path: 'register', component: SaleHistoryComponent }
];

@NgModule({
  declarations: [
    SalePosComponent,
    SaleHistoryComponent,
    ActionsSalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
