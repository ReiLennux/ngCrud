import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PrincipalProductsComponent } from './principal-products/principal-products.component';
import { SecondaryProductsComponent } from './secondary-products/secondary-products.component';
import { ActionsComponent } from './principal-products/actions/actions.component';

const routes: Routes = [
  { path: '', component: PrincipalProductsComponent },
  { path: 'register', component: SecondaryProductsComponent },
  { path: 'edit/:id', component: SecondaryProductsComponent }
];

@NgModule({
  declarations: [
    PrincipalProductsComponent,
    SecondaryProductsComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
