import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {SharedModule} from '@app/shared';
import {environment} from '@env/environment';

import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionEffects} from './store/transactions.effects';
import {transactionReducer} from '@app/transactions/store/transactions.reducer';
import {TransactionsContainerComponent} from '@app/transactions/components/transactions-container/transactions-container.component';
import {TransactionFormComponent} from '@app/transactions/components/transaction-edit/transaction-form.component';
import {TransactionCardComponent} from './components/transaction-card/transaction-card.component';
import {TransactionDataService} from '@app/transactions/services/transaction-data.service';
import {Transaction} from '@app/transactions/store/transaction.model';
import {ActionLoadAllTransactions} from '@app/transactions/store/transactions.actions';

@NgModule({
  imports: [
    SharedModule,
    TransactionsRoutingModule,
    StoreModule.forFeature('transaction', transactionReducer),
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
    TransactionCardComponent
  ],
  providers: [TransactionDataService]
})
export class TransactionsModule {
  constructor(private store: Store<Transaction>) {
    this.store.dispatch(new ActionLoadAllTransactions())
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
