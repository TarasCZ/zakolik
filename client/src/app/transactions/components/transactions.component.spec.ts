import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { MockStore, TestingModule } from '@testing/utils';

import { State } from '../../examples.state';
import { BookState } from '../store/transaction.model';
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [TransactionsComponent]
    }).compileComponents();
    store = TestBed.get(Store);
    store.setState(createState({ ids: [], entities: {} }));
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function createState(booksState: BookState) {
  return {
    examples: {
      books: booksState
    }
  } as State;
}
