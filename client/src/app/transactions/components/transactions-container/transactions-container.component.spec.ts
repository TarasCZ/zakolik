import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { MockStore, TestingModule } from '@testing/utils';

import { State } from '../../examples.state';
import { BookState } from '../../model/transaction.model';
import { TransactionsContainerComponent } from './transactions-container.component';

describe('TransactionsContainerComponent', () => {
  let component: TransactionsContainerComponent;
  let fixture: ComponentFixture<TransactionsContainerComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [TransactionsContainerComponent]
    }).compileComponents();
    store = TestBed.get(Store);
    store.setState(createState({ ids: [], entities: {} }));
    fixture = TestBed.createComponent(TransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should upsert', () => {
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
