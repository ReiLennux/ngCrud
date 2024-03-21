import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { StateFilterComponent } from './components/user-list/state-filter/state-filter.component';
import { TypeFilterComponent } from './components/user-list/type-filter/type-filter.component';
import { AlertComponent } from './components/user-form/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { Alert2Component } from './components/user-form/alert2/alert2.component';
import { HomeComponent } from './components/home/home.component';
@NgModule({
  declarations: [
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
