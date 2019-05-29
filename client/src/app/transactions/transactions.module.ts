import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {SharedModule} from '@app/shared';
import {environment} from '@env/environment';

import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionEffects} from './store/transactions.effects';
import {transactionReducer} from '@app/transactions/store/transactions.reducer';
import {TransactionsComponent} from '@app/transactions/components/transactions.component';

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
  declarations: [TransactionsComponent],
  providers: []
})
export class TransactionsModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}
