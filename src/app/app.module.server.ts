import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environments';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), 
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
