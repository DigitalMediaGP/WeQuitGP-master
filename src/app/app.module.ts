import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';      
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WebChatConnection } from 'finalwebchatclientjson';


import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

// const firebaseUiAuthConfig: firebaseui.auth.Config = {
//   signInFlow: 'popup',
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//   ],
//  // tosUrl: '/terms',
//  // privacyPolicyUrl: '/privacy',
//   credentialHelper: firebaseui.auth.CredentialHelper.NONE
// };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
   // FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFirestoreModule
  ],
  providers: [
    WebChatConnection,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
