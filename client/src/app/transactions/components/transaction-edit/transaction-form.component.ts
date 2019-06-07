import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Transaction, TransactionTypes} from '@app/transactions/store/transaction.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {v4 as uuid} from 'uuid';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {ActionUpsertOneTransaction} from '@app/transactions/store/transactions.actions';
import {DeviceDetectorService} from 'ngx-device-detector';
import {notZeroValidator} from '@app/shared/validators/not-zero.validator';
import * as fromTransactions from '@app/transactions/store/transactions.selectors';
import {take} from 'rxjs/operators';

@Component({
  selector: 'zklk-transaction-edit',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],

})
export class TransactionFormComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  isTouchDevice: boolean;
  maxDate = new Date();
  types = Object.keys(TransactionTypes);
  transactionFormGroup = this.fb.group({
    id: uuid(),
    name: '',
    value: this.fb.control({ value: null }, [Validators.required, notZeroValidator]),
    type: 'Other',
    description: '',
    date: { value: new Date(), disabled: true },
    isSelected: false
  });

  @Input()
  id: string;

  constructor(
    public store: Store<Transaction>,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.params['value'].id;
    this.isTouchDevice = !this.deviceService.isDesktop();

    this.store.pipe(select(fromTransactions.selectTransaction(this.id))).pipe(take(1))
      .subscribe((transaction) => {
        if (transaction) this.transactionFormGroup.patchValue({
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
