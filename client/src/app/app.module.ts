import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './static/home/home.component';
import { CallbackComponent } from './static/callback/callback.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LoginComponent } from './static/login/login.component';

export function registerFrLocale() {
  registerLocaleData(localeFr, 'fr');
}

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    SettingsModule,

    // app
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerFrLocale();
  }
}
