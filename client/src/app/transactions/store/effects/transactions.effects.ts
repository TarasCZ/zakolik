import {Injectable} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {merge} from 'rxjs';
import {distinctUntilChanged, exhaustMap, filter, map, tap} from 'rxjs/operators';

import {TitleService} from '@app/core';
import {selectSettingsState, SettingsActions, SettingsActionTypes, State} from '@app/settings';
import {TransactionDataService} from '@app/transactions/services/transaction-data.service';
import {
  ActionDeleteOneTransaction,
  ActionUpsertManyTransactions,
  ActionUpsertOneTransaction,
  TransactionActionTypes
} from '@app/transactions/store/actions/transactions.actions';

@Injectable()
export class TransactionEffects {

  @Effect()
  loadAllTransactions = this.actions$.pipe(
    ofType(TransactionActionTypes.LOAD_ALL),
    exhaustMap(() => {
      return this.transactionDataService.getAllTransactions().pipe(
        map((transactions) => new ActionUpsertManyTransactions(transactions))
      )
    })
  );

  @Effect({dispatch: false})
  postTransaction = this.actions$.pipe(
    ofType<ActionUpsertOneTransaction>(TransactionActionTypes.UPSERT_ONE),
    exhaustMap(({transaction}) => this.transactionDataService.postTransaction(transaction))
  );

  @Effect({dispatch: false})
  deleteTransaction = this.actions$.pipe(
    ofType<ActionDeleteOneTransaction>(TransactionActionTypes.DELETE_ONE),
    exhaustMap(({id}) => this.transactionDataService.deleteTransaction(id))
  );

  @Effect({ dispatch: false })
  setTranslateServiceLanguage = this.store.pipe(
    select(selectSettingsState),
    map(settings => settings.language),
    distinctUntilChanged(),
    tap(language => this.translateService.use(language))
  );

  @Effect({ dispatch: false })
  setTitle = merge(
    this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_LANGUAGE)),
    this.router.events.pipe(filter(event => event instanceof ActivationEnd))
  ).pipe(
    tap(() => {
      this.titleService.setTitle(
        this.router.routerState.snapshot.root,
        this.translateService
      );
    })
  );

  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private translateService: TranslateService,
    private transactionDataService: TransactionDataService,
    private router: Router,
    private titleService: TitleService
  ) {
  }
}
