import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../assets/environments/environment.prod';


 

export const appConfig: ApplicationConfig = {
  providers: 
  [provideRouter(routes), 
    importProvidersFrom(
    AngularFireModule.initializeApp(environment.firebaseConfig)), 
     AngularFirestoreModule, 
    importProvidersFrom(provideAuth(() => getAuth())),
     importProvidersFrom(provideFirestore(() => getFirestore())), 
     importProvidersFrom(provideStorage(() => getStorage())),
    ]
};
