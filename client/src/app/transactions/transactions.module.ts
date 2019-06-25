import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionEffects } from './store/effects/transactions.effects';
import { transactionReducer } from '@app/transactions/store/reducers/transactions.reducer';
import { TransactionsContainerComponent } from '@app/transactions/components/transactions-container/transactions-container.component';
import { TransactionFormComponent } from '@app/transactions/components/transaction-form/transaction-form.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionDataService } from '@app/transactions/services/transaction-data.service';
import { Transaction } from '@app/transactions/model/transaction.model';
import { TransactionAmountComponent } from './components/transaction-amount/transaction-amount.component';
import { loadAllTransactions } from '@app/transactions/store/actions/transactions.actions';
import { TRANSACTIONS_REDUCER } from '@app/transactions/store/transaction.state';

@NgModule({
  imports: [
    SharedModule,
    TransactionsRoutingModule,
    StoreModule.forFeature('transaction', TRANSACTIONS_REDUCER),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([TransactionEffects])
  ],
  declarations: [
    TransactionsContainerComponent,
    TransactionFormComponent,
    TransactionCardComponent,
    TransactionAmountComponent
  ],
  providers: [TransactionDataService]
})
export class TransactionsModule {
  constructor(private store: Store<Transaction>) {
    this.store.dispatch(loadAllTransactions());
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
