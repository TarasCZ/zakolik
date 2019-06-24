import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCardComponent } from './transaction-card.component';
import { TestingModule } from '@testing/utils';
import { TransactionAmountComponent } from '@app/transactions/components/transaction-amount/transaction-amount.component';
import { MockComponent } from 'ng-mocks';
import { createTransaction } from '@testing/transaction.factory';
import { By } from '@angular/platform-browser';

describe('TransactionCardComponent', () => {
  const transaction = createTransaction({});
  let component: TransactionCardComponent;
  let fixture: ComponentFixture<TransactionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        TransactionCardComponent,
        MockComponent(TransactionAmountComponent)
      ]
    });

    fixture = TestBed.createComponent(TransactionCardComponent);
    component = fixture.componentInstance;
    component.transaction = transaction;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event', done => {
    const editButton = fixture.debugElement.query(
      By.css('[data-testid="edit-button"]')
    );

    component.edit.subscribe(event => {
      expect(event).toEqual(transaction.id);
      done();
    });

    editButton.nativeElement.click();
  });

  it('should emit delete event', done => {
    const removeButton = fixture.debugElement.query(
      By.css('[data-testid="delete-button"]')
    );

    component.remove.subscribe(event => {
      expect(event).toEqual(transaction.id);
      done();
    });

    removeButton.nativeElement.click();
  });

  it('should toggle select', () => {
    const matCard = fixture.debugElement.query(
      By.css('[data-testid="transaction-item"]')
    );

    expect(component.isSelected).toBeFalsy();

    matCard.nativeElement.click();

    expect(component.isSelected).toBeTruthy();

    matCard.nativeElement.click();

    expect(component.isSelected).toBeFalsy();
  });
});
