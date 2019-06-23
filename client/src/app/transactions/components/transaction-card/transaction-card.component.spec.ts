import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCardComponent } from './transaction-card.component';
import { TestingModule } from '@testing/utils.spec';
import { TransactionAmountComponent } from '@app/transactions/components/transaction-amount/transaction-amount.component';

describe('TransactionCardComponent', () => {
  let component: TransactionCardComponent;
  let fixture: ComponentFixture<TransactionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [TransactionCardComponent, TransactionAmountComponent]
    });

    fixture = TestBed.createComponent(TransactionCardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should upsert', () => {
    expect(component).toBeTruthy();
  });
});
