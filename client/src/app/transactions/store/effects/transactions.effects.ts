import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge } from 'rxjs';
import {
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  tap
} from 'rxjs/operators';

import { TitleService } from '@app/core';
import { changeLanguage, selectSettingsState, State } from '@app/settings';
import { TransactionDataService } from '@app/transactions/services/transaction-data.service';
import * as TransactionActions from '../actions/transactions.actions';

@Injectable()
export class TransactionEffects {
  loadAllTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadAllTransactions),
      exhaustMap(() => {
        return this.transactionDataService
          .getAllTransactions()
          .pipe(
            map(transactions =>
              TransactionActions.upsertManyTransactions({ transactions })
            )
          );
      })
    )
  );

  postTransaction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.upsertTransaction),
        exhaustMap(({ transaction }) =>
          this.transactionDataService.postTransaction(transaction)
        )
      ),
    { dispatch: false }
  );

  deleteTransaction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionActions.deleteTransaction),
        exhaustMap(({ id }) =>
          this.transactionDataService.deleteTransaction(id)
        )
      ),
    { dispatch: false }
  );

  setTranslateServiceLanguage$ = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsState),
        map(settings => settings.language),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  setTitle$ = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(changeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private translateService: TranslateService,
    private transactionDataService: TransactionDataService,
    private router: Router,
    private titleService: TitleService
  ) {}
}
