import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormComponent } from '@app/transactions/components';
import { provideFrLocale } from '@app/app.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { createTransaction } from '@testing/transaction.factory';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { upsertTransaction } from '@app/transactions/store/actions/transactions.actions';

jest.mock('browser-detect');

describe('TransactionFormComponent', () => {
  const transaction = createTransaction({});
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let store: MockStore<any>;
  let router: Router;

  beforeEach(() => {
    require('browser-detect').default = () => ({ mobile: false });
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        TransactionFormComponent,
        MockPipe(TranslatePipe, val => `translated ${val}`)
      ],
      providers: [provideFrLocale(), provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    store.setState({
      transaction: {
        ids: [transaction.id],
        entities: { [transaction.id]: transaction }
      },
      router: {
        state: {
          params: {
            id: transaction.id
          }
        }
      }
    });

    router = TestBed.get(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load transaction name from state', () => {
    const nameControl = fixture.debugElement.query(
      By.css('[data-testid="name-control"]')
    );

    expect(nameControl.nativeElement.value).toEqual(transaction.name);
  });

  it('should load transaction value from state', () => {
    const valueControl = fixture.debugElement.query(
      By.css('[data-testid="value-control"]')
    );

    expect(valueControl.nativeElement.value).toEqual(
      transaction.value.toString()
    );
  });

  it('should load transaction date from state', () => {
    const dateControl = fixture.debugElement.query(
      By.css('[data-testid="date-control"]')
    );

    expect(dateControl.nativeElement.value).toEqual('1/1/1970');
  });

  it('should load transaction type from state', () => {
    expect(component.transactionFormGroup.controls['type'].value).toEqual(
      transaction.type
    );
  });

  it('should load transaction description from state', () => {
    const descriptionControl = fixture.debugElement.query(
      By.css('[data-testid="description-control"]')
    );

    expect(descriptionControl.nativeElement.value).toEqual(
      transaction.description
    );
  });

  it('should save transaction description from state and redirect', () => {
    const saveButton = fixture.debugElement.query(
      By.css('[data-testid="save-button"]')
    );
    saveButton.nativeElement.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      upsertTransaction({ transaction })
    );
    expect(router.navigate).toHaveBeenCalledWith(['transactions']);
  });
});
