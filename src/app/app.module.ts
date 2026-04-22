import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PrincipalProductsComponent } from './features/products/principal-products/principal-products.component';
import { SecondaryProductsComponent } from './features/products/secondary-products/secondary-products.component';
import { ActionsComponent } from './features/products/principal-products/actions/actions.component';
import { PrincipalSalesComponent } from './features/sales/principal-sales/principal-sales.component';
import { SecondarySalesComponent } from './features/sales/secondary-sales/secondary-sales.component';
import { ActionsUserComponent } from './features/users/user-list/actions/actions-user.component';
import { ActionsSalesComponent } from './features/sales/secondary-sales/actions-sales/actions-sales.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environments';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AddCategoriesComponent } from './features/catalogs/products/add-categories/add-categories.component';
import { CatalogPrincipalComponent } from './features/catalogs/catalog-principal/catalog-principal.component';
import { GTextAreaInput } from './shared/components/inputs/g-text-area/g-text-area.input';
import { GTextInput } from './shared/components/inputs/g-text/g-text.input';
import { GDateInput } from './shared/components/inputs/g-date/g-date.input';
import { GSelectInputComponent } from './shared/components/inputs/g-select/g-select.input';

export function initializeFirebaseApp() {
    return initializeApp(environment.firebase);
  }

  @NgModule({
    declarations: [
      GTextAreaInput,
      GTextInput,
      GDateInput,
      GSelectInputComponent,
      AppComponent,
      NavigationComponent,
      UserListComponent,
      UserFormComponent,
      LoginComponent,
      HomeComponent,
      PrincipalProductsComponent,
      SecondaryProductsComponent,
      ActionsComponent,
      PrincipalSalesComponent,
      SecondarySalesComponent,
      ActionsUserComponent,
      ActionsSalesComponent,
      AddCategoriesComponent,
      CatalogPrincipalComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      CommonModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ],
    providers: [
      provideClientHydration(),
      provideHttpClient(withInterceptorsFromDi()),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore())
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
