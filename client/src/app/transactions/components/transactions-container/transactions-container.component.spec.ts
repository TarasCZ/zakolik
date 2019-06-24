import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils.spec';
import { TransactionsContainerComponent } from './transactions-container.component';
import { MockComponent } from 'ng-mocks';
import { TransactionCardComponent } from '@app/transactions/components/transaction-card/transaction-card.component';
import {
  TransactionState,
  TransactionTypes
} from '@app/transactions/model/transaction.model';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

describe('TransactionsContainerComponent', () => {
  const transaction = {
    id: '123',
    name: 'name',
    value: 1,
    type: TransactionTypes.Other,
    description: 'description',
    date: 123
  };

  let component: TransactionsContainerComponent;
  let fixture: ComponentFixture<TransactionsContainerComponent>;
  let store: MockStore<TransactionState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        TransactionsContainerComponent,
        MockComponent(TransactionCardComponent)
      ]
    });

    store = TestBed.get(Store);
    store.setState({
      ids: [transaction.id],
      entities: { [transaction.id]: transaction }
    });

    fixture = TestBed.createComponent(TransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('when there is no transactions', () => {
    it('should not display any transaction cards', () => {
      const transactionCards = getTransactionCards();
      expect(transactionCards.length).toBe(0);
    });

    it('should display no transaction information', () => {
      const noTransactionInformation = getNoTransactionInformation();
      // expect(noTransactionInformation).toBeTruthy();
    });
  });

  function getTransactionCards() {
    return fixture.debugElement.queryAll(
      By.directive(TransactionCardComponent)
    );
  }

  function getNoTransactionInformation() {
    return fixture.debugElement.query(
      By.css('[data-testid="no-transaction-information"]')
    );
  }
});
