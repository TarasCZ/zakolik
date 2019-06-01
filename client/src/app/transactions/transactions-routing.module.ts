import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionsContainerComponent} from '@app/transactions/components/transactions-container/transactions-container.component';
import {TransactionEditComponent} from '@app/transactions/components/transaction-edit/transaction-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsContainerComponent
  },
  {
    path: ':id',
    component: TransactionEditComponent,
    data: { title: 'zklk.menu.transactions' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
