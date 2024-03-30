import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { PrincipalProductsComponent } from './components/products/principal-products/principal-products.component';


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
