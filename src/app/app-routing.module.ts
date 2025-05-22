import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './shared/components/home/home.component';
import { PrincipalProductsComponent } from './features/products/principal-products/principal-products.component';
import { SecondaryProductsComponent } from './features/products/secondary-products/secondary-products.component';
import { PrincipalSalesComponent } from './features/sales/principal-sales/principal-sales.component';
import { SecondarySalesComponent } from './features/sales/secondary-sales/secondary-sales.component';
import { AddCategoriesComponent } from './features/catalogs/products/add-categories/add-categories.component';
import { CatalogPrincipalComponent } from './features/catalogs/catalog-principal/catalog-principal.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { hideNavbar: false }
  },
  {
      path: "users",
      component: UserListComponent,
      canActivate: [AuthGuard],
      data: { hideNavbar: true }
  },
  {
      path: "register-user",
      component: UserFormComponent,
      canActivate: [AuthGuard],
      data: { hideNavbar: true }
  },
  {
    path:"products",
    component: PrincipalProductsComponent,
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path:'register-product',
    component: SecondaryProductsComponent,
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path:'sales',
    component: PrincipalSalesComponent,
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path:'register-sales',
    component: SecondarySalesComponent,
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path:'catalogs',
    component: CatalogPrincipalComponent,
    canActivate: [AuthGuard],
    data: { hideNavbar: true },
    children: [
      {
        path: 'products',
        component: AddCategoriesComponent,
        canActivate: [AuthGuard],
        data: { hideNavbar: true }
      }
    ]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path:'**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
