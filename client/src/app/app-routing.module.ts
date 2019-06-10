import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {AuthGuardService} from '@app/core';
import {HomeComponent} from '@app/static/home/home.component';
import {CallbackComponent} from '@app/static/callback/callback.component';
import {LoginComponent} from '@app/static/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions', // dashboard in the future
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'zklk.menu.settings' }
  },
  {
    path: 'transactions',
    canLoad: [AuthGuardService],
    loadChildren: 'app/transactions/transactions.module#TransactionsModule'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'login',
    component:  LoginComponent
  },
  {
    path: '**',
    redirectTo: 'transactions'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
