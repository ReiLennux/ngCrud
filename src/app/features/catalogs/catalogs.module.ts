import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CatalogPrincipalComponent } from './catalog-principal/catalog-principal.component';
import { AddCategoriesComponent } from './products/add-categories/add-categories.component';

const routes: Routes = [
  { path: '', component: CatalogPrincipalComponent },
  { path: 'categories', component: AddCategoriesComponent }
];

@NgModule({
  declarations: [
    CatalogPrincipalComponent,
    AddCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogsModule { }
