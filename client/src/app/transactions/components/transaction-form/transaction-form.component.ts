import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Transaction,
  TransactionTypeIcons,
  TransactionTypes
} from '@app/transactions/model/transaction.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { AppState, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { notZeroValidator } from '@app/shared/validators/not-zero.validator';
import * as fromTransactions from '@app/transactions/store/transactions.selectors';
import { first, map } from 'rxjs/operators';
import browser from 'browser-detect';
import { isDefined } from '@app/shared/utils/helper-functions';
import { upsertTransaction } from '@app/transactions/store/actions/transactions.actions';
import { selectRouterParam } from '@app/core/router/router.selectors';
import { DateAdapter } from '@angular/material';
import { selectSettingsLanguage } from '@app/settings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zklk-transaction-edit',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  localeSubscription: Subscription;

  TransactionTypeIcons = TransactionTypeIcons;
  types = Object.values(TransactionTypes);

  isTouchDevice: boolean;
  maxDate = new Date();

  selectTypeFormControl = this.fb.control('OTHER');
  transactionFormGroup = this.fb.group({
    id: uuid(),
    name: this.fb.control('', [Validators.maxLength(20)]),
    value: this.fb.control(null, [Validators.required, notZeroValidator]),
    type: this.selectTypeFormControl,
    description: this.fb.control('', [Validators.maxLength(50)]),
    date: { value: new Date(), disabled: true }
  });

  id: string;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectRouterParam, 'id'))
      .subscribe(id => (this.id = id));

    this.isTouchDevice = browser().mobile;

    this.store
      .pipe(select(fromTransactions.selectTransaction, this.id))
      .pipe(first(isDefined))
      .subscribe(transaction => {
        this.transactionFormGroup.patchValue({
          ...transaction,
          date: new Date(transaction.date)
        });
      });

    this.localeSubscription = this.store
      .pipe(
        select(selectSettingsLanguage),
        map(this.mapLanguageToLocale)
      )
      .subscribe(language => this.dateAdapter.setLocale(language));
  }

  ngOnDestroy(): void {
    this.localeSubscription.unsubscribe();
  }

  save() {
    if (this.transactionFormGroup.valid) {
      const transaction: Transaction = {
        ...this.transactionFormGroup.value,
        date: Date.parse(this.transactionFormGroup.controls.date.value)
      };
      this.store.dispatch(upsertTransaction({ transaction }));
      this.router.navigate(['transactions']);
    }
  }

  private mapLanguageToLocale(language: string): string {
    switch (language) {
      case 'en':
        return 'en-UK';
      case 'cz':
        return 'cs';
      default:
        return language;
    }
  }
}
