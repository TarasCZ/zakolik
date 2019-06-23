import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsContainerComponent } from '@app/transactions/components/transactions-container/transactions-container.component';
import { TransactionFormComponent } from '@app/transactions/components/transaction-form/transaction-form.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsContainerComponent,
    data: { title: 'zklk.menu.transactions' }
  },
  {
    path: ':id',
    component: TransactionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
