import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils.spec';
import { TransactionsContainerComponent } from './transactions-container.component';
import { TransactionsModule } from '@app/transactions/transactions.module';

describe('TransactionsContainerComponent', () => {
  let component: TransactionsContainerComponent;
  let fixture: ComponentFixture<TransactionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, TransactionsModule]
      // declarations: [TransactionsContainerComponent]
    });

    fixture = TestBed.createComponent(TransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should upsert', () => {
    expect(component).toBeTruthy();
  });
});
