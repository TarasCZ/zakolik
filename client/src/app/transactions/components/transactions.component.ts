import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';

import {Transaction} from '../store/transaction.model';
import {selectAll} from '@app/transactions/store/transactions.selectors';
import {ActionUpsertOneTransaction} from '@app/transactions/store/transactions.actions';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'zklk-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  transactions$: Observable<Transaction[]> = this.store.pipe(select(selectAll));

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router
  ) {}

  select(transaction: Transaction) {
    this.router.navigate(['transactions', transaction.id]);
  }

  addNew() {
    this.store.dispatch(new ActionUpsertOneTransaction({
      transaction: {
        id: uuid(),
        name: 'New Transaction',
        value: 1234,
        type: 'Other',
        description: 'Short text description',
        date: Date.now()
      }
    }));
    this.router.navigate(['transactions']);
  }
}
