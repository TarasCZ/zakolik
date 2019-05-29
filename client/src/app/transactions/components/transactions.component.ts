import { v4 as uuid } from 'uuid';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { State } from '../../examples.state';
import {Transaction} from '../store/transaction.model';
import { ActionTransactionsUpsertOne, ActionTransactionsDeleteOne } from '../transactions.actions';
import { selectSelectedTransaction, selectAllTransactions } from '../transactions.selectors';

@Component({
  selector: 'zklk-crud',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  transactionFormGroup = this.fb.group(CrudComponent.createTransaction());
  transactions$: Observable<Transaction[]> = this.store.pipe(select(selectAllTransactions));

  isEditing: boolean;

  static createTransaction(): Transaction {
    return {
      id: uuid(),
      title: '',
      author: '',
      description: ''
    };
  }

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  select(transaction: Transaction) {
    this.isEditing = false;
    this.router.navigate(['examples/crud', transaction.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  edit(transaction: Transaction) {
    this.isEditing = true;
    this.transactionFormGroup.setValue(transaction);
  }

  addNew(transactionForm: NgForm) {
    transactionForm.resetForm();
    this.transactionFormGroup.reset();
    this.transactionFormGroup.setValue(CrudComponent.createTransaction());
    this.isEditing = true;
  }

  delete(transaction: Transaction) {
    this.store.dispatch(new ActionTransactionsDeleteOne({ id: transaction.id }));
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  save() {
    if (this.transactionFormGroup.valid) {
      const transaction = this.transactionFormGroup.value;
      this.store.dispatch(new ActionTransactionsUpsertOne({ transaction }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', transaction.id]);
    }
  }
}
