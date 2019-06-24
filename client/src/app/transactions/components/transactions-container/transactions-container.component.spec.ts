import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { TransactionsContainerComponent } from './transactions-container.component';
import { MockComponent } from 'ng-mocks';
import { TransactionCardComponent } from '@app/transactions/components/transaction-card/transaction-card.component';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { createTransaction } from '@testing/transaction.factory';
import { Router } from '@angular/router';
import { deleteTransaction } from '@app/transactions/store/actions/transactions.actions';

describe('TransactionsContainerComponent', () => {
  const transaction1 = createTransaction({ id: 'id1' });
  const transaction2 = createTransaction({ id: 'id2' });

  let component: TransactionsContainerComponent;
  let fixture: ComponentFixture<TransactionsContainerComponent>;
  let store: MockStore<any>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        TransactionsContainerComponent,
        MockComponent(TransactionCardComponent)
      ]
    });

    router = TestBed.get(Router);
    router.navigate = jest.fn();

    store = TestBed.get(Store);
    store.setState({
      transaction: {
        ids: [],
        entities: {}
      }
    });

    fixture = TestBed.createComponent(TransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect when new transaction is added', () => {
    const addButton = getAddButton();
    addButton.nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['transactions/new']);
  });

  describe('when there is no transactions', () => {
    it('should not display any transaction cards', () => {
      const transactionCards = getTransactionCards();
      expect(transactionCards.length).toBe(0);
    });

    it('should display no transaction information', () => {
      fixture.detectChanges();
      const noTransactionInformation = getNoTransactionInformation();
      expect(noTransactionInformation).toBeTruthy();
    });
  });

  describe('when there are some transactions', () => {
    beforeEach(() => {
      store.setState({
        transaction: {
          ids: [transaction1.id, transaction2.id],
          entities: {
            [transaction1.id]: transaction1,
            [transaction2.id]: transaction2
          }
        }
      });
      fixture.detectChanges();
    });

    it('should display the transaction cards', () => {
      const transactionCards = getTransactionCards();
      expect(transactionCards.length).toBe(2);
    });

    it('should not display no transaction information', () => {
      const noTransactionInformation = getNoTransactionInformation();
      expect(noTransactionInformation).toBeFalsy();
    });

    it('should redirect when edit event is emitted', () => {
      const firstCard = getTransactionCards()[0]
        .componentInstance as TransactionCardComponent;
      firstCard.edit.emit(transaction1.id);

      expect(router.navigate).toHaveBeenCalledWith([
        `transactions/${transaction1.id}`
      ]);
    });

    it('should dispatch deleteTransaction when remove event is emmited', () => {
      spyOn(store, 'dispatch');
      const firstCard = getTransactionCards()[0]
        .componentInstance as TransactionCardComponent;
      firstCard.remove.emit(transaction1.id);

      expect(store.dispatch).toHaveBeenCalledWith(
        deleteTransaction({ id: transaction1.id })
      );
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

  function getAddButton() {
    return fixture.debugElement.query(
      By.css('[data-testid="add-transaction"]')
    );
  }
});
