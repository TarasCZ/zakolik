import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';

import {Transaction} from '../../store/transaction.model';
import {selectAll} from '@app/transactions/store/transactions.selectors';
import {
  ActionDeleteOneTransaction,
  ActionSelectOneTransaction,
} from '@app/transactions/store/transactions.actions';

@Component({
  selector: 'zklk-transactions',
  templateUrl: './transactions-container.component.html',
  styleUrls: ['./transactions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsContainerComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  transactions$: Observable<Transaction[]> = this.store.pipe(select(selectAll));

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router
  ) {
  }

  selectTransaction({ id, isSelected }) {
    this.store.dispatch(new ActionSelectOneTransaction(id, !isSelected));
  }

  addNewTransaction() {
    this.router.navigate(['transactions/new'])
  }

  editTransaction(id: string) {
    this.router.navigate([`transactions/${id}`])
  }

  removeTransaction(id: string) {
    this.store.dispatch(new ActionDeleteOneTransaction(id))
  }

  trackByFn(index, item) {
    return item.id;
  }
}
