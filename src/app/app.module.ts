import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {

  apiKey: "AIzaSyCWEvmRarZlr6ztG91DXohTZqHns8r26Z8",
  authDomain: "bcdb-42b38.firebaseapp.com",
  databaseURL: "https://bcdb-42b38.firebaseio.com",
  storageBucket: "bcdb-42b38.appspot.com"
};
// console.log(process.env.firebase_apiKey);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
