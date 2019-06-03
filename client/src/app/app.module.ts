import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsModule } from '@app/transactions/transactions.module';
import { LoginComponent } from './static/welcome/login.component';
import { CallbackComponent } from './static/callback/callback.component';

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
    // TransactionsModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent, LoginComponent, CallbackComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
