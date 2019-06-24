import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Action } from '@ngrx/store';

import { changeLanguage } from '@app/settings';
import { ActivationEnd, Router } from '@angular/router';
import { TitleService } from '@app/core';
import { TransactionEffects } from './transactions.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { of, ReplaySubject } from 'rxjs';
import { createSpyObj, expectEffectFactory } from '@testing/utils';
import { TestBed } from '@angular/core/testing';
import { TransactionDataService } from '@app/transactions/services/transaction-data.service';
import * as TransactionActions from '@app/transactions/store/actions/transactions.actions';
import {
  Transaction,
  TransactionTypes
} from '@app/transactions/model/transaction.model';

describe('SettingsEffects', () => {
  const transaction: Transaction = {
    id: 'id',
    name: 'name',
    value: 123,
    description: 'description',
    type: TransactionTypes.Other,
    date: 123
  };

  let transactionEffects: TransactionEffects;
  let actions: ReplaySubject<Action>;
  let router: any;
  let routerEvents: ReplaySubject<ActivationEnd>;
  let titleService: any;
  let translateService: any;
  let transactionDataService: any;
  let expectEffect: any;

  beforeEach(() => {
    actions = new ReplaySubject(1);
    routerEvents = new ReplaySubject(1);
    router = {
      routerState: {
        snapshot: {
          root: { fragment: 'fragment' }
        }
      },
      events: routerEvents
    };

    titleService = createSpyObj('TitleService', ['setTitle'])(jest);
    translateService = createSpyObj('TranslateService', ['use'])(jest);
    transactionDataService = createSpyObj('TransactionDataService', [
      'getAllTransactions',
      'postTransaction',
      'deleteTransaction'
    ])(jest);

    TestBed.configureTestingModule({
      providers: [
        TransactionEffects,
        provideMockStore(),
        { provide: Router, useValue: router },
        { provide: Actions, useValue: actions },
        { provide: TranslateService, useValue: translateService },
        { provide: TitleService, useValue: titleService },
        { provide: TransactionDataService, useValue: transactionDataService }
      ]
    });

    transactionEffects = TestBed.get(TransactionEffects);
    const metadata = getEffectsMetadata(transactionEffects);
    expectEffect = expectEffectFactory(metadata, expect);
  });

  describe('loadAllTransactions', () => {
    it('should not dispatch action', () =>
      expectEffect('loadAllTransactions$').toBeAbleToDispatchAction());

    it('should load all transactions', done => {
      const transactions = [transaction];
      transactionDataService.getAllTransactions.mockReturnValue(
        of(transactions)
      );
      const action = TransactionActions.loadAllTransactions();
      actions.next(action);

      transactionEffects.loadAllTransactions$.subscribe(emittedAction => {
        expect(emittedAction).toEqual(
          TransactionActions.upsertManyTransactions({ transactions })
        );
        done();
      });
    });
  });

  describe('postTransaction', () => {
    it('should not dispatch action', () =>
      expectEffect('postTransaction$').not.toBeAbleToDispatchAction());

    it('should post transaction', done => {
      transactionDataService.postTransaction.mockReturnValue(of({}));
      const action = TransactionActions.upsertTransaction({ transaction });
      actions.next(action);

      transactionEffects.postTransaction$.subscribe(() => {
        expect(transactionDataService.postTransaction).toHaveBeenCalledWith(
          transaction
        );
        done();
      });
    });
  });

  describe('deleteTransaction', () => {
    it('should not dispatch action', () =>
      expectEffect('deleteTransaction$').not.toBeAbleToDispatchAction());

    it('should remove transaction', done => {
      transactionDataService.deleteTransaction.mockReturnValue(of({}));
      const id = 'id';
      const action = TransactionActions.deleteTransaction({ id });
      actions.next(action);

      transactionEffects.deleteTransaction$.subscribe(() => {
        expect(transactionDataService.deleteTransaction).toHaveBeenCalledWith(
          id
        );
        done();
      });
    });
  });

  describe('setTranslateServiceLanguage', () => {
    it('should not dispatch action', () =>
      expectEffect(
        'setTranslateServiceLanguage$'
      ).not.toBeAbleToDispatchAction());
  });

  describe('setTitle', () => {
    it('should not dispatch action', () =>
      expectEffect('setTitle$').not.toBeAbleToDispatchAction());

    it('should setTitle', done => {
      const action = changeLanguage({ language: 'en' });
      actions.next(action);

      const routerEvent = new ActivationEnd(router.routerState.snapshot);
      router.events.next(routerEvent);

      transactionEffects.setTitle$.subscribe(() => {
        expect(titleService.setTitle).toHaveBeenCalledWith(
          router.routerState.snapshot.root,
          translateService
        );
        done();
      });
    });
  });
});
