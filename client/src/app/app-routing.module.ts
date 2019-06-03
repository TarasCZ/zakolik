import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import {AuthGuardService} from '@app/core';
import {LoginComponent} from '@app/static/welcome/login.component';
import {CallbackComponent} from '@app/static/callback/callback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transaction',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'zklk.menu.settings' }
  },
  {
    path: 'transactions',
    canActivate: [AuthGuardService],
    loadChildren: 'app/transactions/transactions.module#TransactionsModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
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
