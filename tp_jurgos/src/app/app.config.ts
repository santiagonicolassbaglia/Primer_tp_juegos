import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tp-juegos-nuevo","appId":"1:436544323404:web:c0bf19237b8725ad9d19e9","storageBucket":"tp-juegos-nuevo.appspot.com","apiKey":"AIzaSyAIQYpEwZ5WtQVW4B8CG4UVc9e1k_VpPFc","authDomain":"tp-juegos-nuevo.firebaseapp.com","messagingSenderId":"436544323404"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))]
};
