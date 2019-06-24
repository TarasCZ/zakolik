import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ColorLevel,
  TransactionAmountComponent
} from './transaction-amount.component';
import { By } from '@angular/platform-browser';
import { provideFrLocale } from '@app/app.module';

describe('TransactionAmountComponent', () => {
  const defaultValue = 123;
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
    component.value = defaultValue;
    component.currency = currency;
    fixture.detectChanges();
    component.ngOnChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a value', () => {
    const valueElement = getTransactionValue();

    expect(valueElement.nativeElement.innerHTML).toBe(
      `${defaultValue} ${currency}`
    );
  });

  it('should have green color', () => {
    [
      { value: -5001, expectedColor: ColorLevel.Reddest },
      { value: -1001, expectedColor: ColorLevel.Redder },
      { value: -1, expectedColor: ColorLevel.Red },
      { value: 1, expectedColor: ColorLevel.Green },
      { value: 2001, expectedColor: ColorLevel.Greener },
      { value: 10001, expectedColor: ColorLevel.Greenest }
    ].forEach(({ value, expectedColor }) => {
      component.value = value;
      component.ngOnChanges();

      expect(component.color).toBe(expectedColor);
    });
  });

  function getTransactionValue() {
    return fixture.debugElement.query(
      By.css('[data-testid="transaction-value"')
    );
  }
});
