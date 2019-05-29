import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Transaction} from '@app/transactions/store/transaction.model';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {v4 as uuid} from "*";
import {ActionDeleteOneTransaction} from '@app/transactions/store/transactions.actions';

@Component({
  selector: 'zklk-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionEditComponent {

  transactionFormGroup = this.fb.group(TransactionEditComponent.createTransaction());

  static createTransaction(): Transaction {
    return {
      id: uuid(),
      name: '',
      value: 0,
      type: '',
      description: '',
      date: 123
    };
  }

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  deselect() {
    this.router.navigate(['transactions']);
  }

  edit(transaction: Transaction) {
    this.router.navigate(['transactions', transaction.id]);
  }

  delete(transaction: Transaction) {
    this.store.dispatch(new ActionDeleteOneTransaction({ id: transaction.id }));
    this.router.navigate(['transactions']);
  }

}
