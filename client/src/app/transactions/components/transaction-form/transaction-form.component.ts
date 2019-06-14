import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Transaction, TransactionTypes} from '@app/transactions/model/transaction.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {v4 as uuid} from 'uuid';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {ActionUpsertOneTransaction} from '@app/transactions/store/actions/transactions.actions';
import {notZeroValidator} from '@app/shared/validators/not-zero.validator';
import * as fromTransactions from '@app/transactions/store/transactions.selectors';
import {first} from 'rxjs/operators';
import browser from 'browser-detect';
import {isDefined} from '@app/shared/utils/helper-functions';
import {TransactionTypeIcons} from '@app/transactions/model/transaction.model';

@Component({
  selector: 'zklk-transaction-edit',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  TransactionTypeIcons = TransactionTypeIcons;

  isTouchDevice: boolean;
  maxDate = new Date();
  types = Object.values(TransactionTypes);
  selectTypeFormControl = this.fb.control('OTHER');
  transactionFormGroup = this.fb.group({
    id: uuid(),
    name: this.fb.control('', [Validators.maxLength(20)]),
    value: this.fb.control(null, [Validators.required, notZeroValidator]),
    type: this.selectTypeFormControl,
    description: this.fb.control('', [Validators.maxLength(50)]),
    date: { value: new Date(), disabled: true }
  });

  @Input()
  id: string;

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.params['value'].id;
    this.isTouchDevice = browser().mobile;

    this.store.pipe(select(fromTransactions.selectTransaction(this.id))).pipe(first(isDefined))
      .subscribe((transaction) => {
        console.log(transaction);
        this.transactionFormGroup.patchValue({
          ...transaction,
          date: new Date(transaction.date)
        })
      });
  }

  save() {
    if (this.transactionFormGroup.valid) {
      const transaction: Transaction = {
        ...this.transactionFormGroup.value,
        date: Date.parse(this.transactionFormGroup.controls.date.value)
      };
      this.store.dispatch(new ActionUpsertOneTransaction(transaction));
      this.router.navigate(['transactions']);
    }
  }
}
