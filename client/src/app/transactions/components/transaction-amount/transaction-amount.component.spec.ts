import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAmountComponent } from './transaction-amount.component';
import { By } from '@angular/platform-browser';
import { provideFrLocale } from '@app/app.module';

describe('TransactionAmountComponent', () => {
  const value = 123;
  const currency = 'Kč';
  let component: TransactionAmountComponent;
  let fixture: ComponentFixture<TransactionAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionAmountComponent],
      providers: [provideFrLocale()]
    });

    fixture = TestBed.createComponent(TransactionAmountComponent);
    component = fixture.componentInstance;
    component.value = value;
    component.currency = currency;
    fixture.detectChanges();
    component.ngOnChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a value', () => {
    const valueElement = getTransactionValue();

    expect(valueElement.nativeElement.innerHTML).toBe(`${value} ${currency}`);
  });

  it('should have green color', () => {
    expect(component.color).toBe('green');
  });

  function getTransactionValue() {
    return fixture.debugElement.query(
      By.css('[data-testid="transaction-value"')
    );
  }
});
