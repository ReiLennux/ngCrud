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
import { AddCategoriesComponent } from './features/products/catalogs/add-categories/add-categories.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
      path: "users",
      component: UserListComponent,
      canActivate: [AuthGuard]
  },
  {
      path: "register-user",
      component: UserFormComponent,
      canActivate: [AuthGuard]
  },
  {
    path:"products",
    component: PrincipalProductsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-categories',
        component: AddCategoriesComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path:'register-product',
    component: SecondaryProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'sales',
    component: PrincipalSalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'register-sales',
    component: SecondarySalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
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
