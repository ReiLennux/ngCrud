import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { StateFilterComponent } from './components/users/user-list/state-filter/state-filter.component';
import { TypeFilterComponent } from './components/users/user-list/type-filter/type-filter.component';
import { AlertComponent } from './components/users/user-form/alert/alert.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { Alert2Component } from './components/users/user-form/alert2/alert2.component';
import { HomeComponent } from './components/home/home.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PrincipalProductsComponent } from './components/products/principal-products/principal-products.component';
import { SecondaryProductsComponent } from './components/products/secondary-products/secondary-products.component';
import { ActionsComponent } from './components/products/principal-products/actions/actions.component';
import { CatFilterComponent } from './components/products/principal-products/cat-filter/cat-filter.component';
import { SubcatFilterComponent } from './components/products/principal-products/subcat-filter/subcat-filter.component';
import { PrincipalSalesComponent } from './components/sales/principal-sales/principal-sales.component';
import { SecondarySalesComponent } from './components/sales/secondary-sales/secondary-sales.component';
import { ActionsUserComponent } from './components/users/user-list/actions-user/actions-user.component';
import { ActionsSalesComponent } from './components/sales/secondary-sales/actions-sales/actions-sales.component';

@NgModule({ declarations: [
        AppComponent,
        NavigationComponent,
        UserListComponent,
        UserFormComponent,
        StateFilterComponent,
        TypeFilterComponent,
        AlertComponent,
        LoginComponent,
        Alert2Component,
        HomeComponent,
        PaginatorComponent,
        PrincipalProductsComponent,
        SecondaryProductsComponent,
        ActionsComponent,
        CatFilterComponent,
        SubcatFilterComponent,
        PrincipalSalesComponent,
        SecondarySalesComponent,
        ActionsUserComponent,
        ActionsSalesComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
