import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Transaction} from '@app/transactions/store/transaction.model';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {v4 as uuid} from 'uuid';
import {Observable} from 'rxjs';
import * as fromTransactions from '@app/transactions/store/transactions.selectors';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {ActionUpsertOneTransaction} from '@app/transactions/store/transactions.actions';
import {take, tap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'zklk-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  transaction$: Observable<Transaction>;
  transactionFormGroup = this.fb.group(TransactionEditComponent.createTransaction());

  @Input()
  id: string;

  static createTransaction(): Transaction {
    return {
      id: uuid(),
      name: '',
      value: null,
      type: '',
      description: '',
      date: Date.now(),
      isSelected: false,
    };
  }

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.params['value'].id;

    this.store.pipe(select(fromTransactions.selectTransaction(this.id))).pipe(take(1))
      .subscribe((transaction) => {
        if (transaction) this.transactionFormGroup.patchValue(transaction)
      });
  }

  save() {
    if (this.transactionFormGroup.valid) {
      const transaction = this.transactionFormGroup.value;
      this.store.dispatch(new ActionUpsertOneTransaction(transaction));
      this.router.navigate(['transactions']);
    }
  }
}
