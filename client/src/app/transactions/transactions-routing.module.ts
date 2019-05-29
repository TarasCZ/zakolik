import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsComponent} from '@app/transactions/components/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent
  },
  {
    path: ':id',
    component: TransactionsComponent,
    data: { title: 'zklk.menu.transactions' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
