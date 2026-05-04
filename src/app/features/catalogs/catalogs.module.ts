import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CatalogPrincipalComponent } from './catalog-principal/catalog-principal.component';
import { AddCategoriesComponent } from './categories/add-categories.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

const routes: Routes = [
  { path: '', component: CatalogPrincipalComponent },
  { path: 'categories', component: AddCategoriesComponent },
  { path: 'clients', component: UnderConstructionComponent },
  { path: 'suppliers', component: UnderConstructionComponent }
];

@NgModule({
  declarations: [
    CatalogPrincipalComponent,
    AddCategoriesComponent,
    UnderConstructionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogsModule { }
