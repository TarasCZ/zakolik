import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils.spec';
import { TransactionFormComponent } from '@app/transactions/components';
import { DateAdapter } from '@angular/material';
import { TransactionModule } from '../../../../../../server/src/transactions/transaction.module';

describe('TransactionCardComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, TransactionModule]
      // declarations: [TransactionFormComponent]
    });

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should upsert', () => {
    expect(component).toBeTruthy();
  });
});
