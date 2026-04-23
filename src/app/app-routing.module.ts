import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    data: { hideNavbar: false }
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path: 'sales',
    loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule),
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path: 'catalogs',
    loadChildren: () => import('./features/catalogs/catalogs.module').then(m => m.CatalogsModule),
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: { hideNavbar: true }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
