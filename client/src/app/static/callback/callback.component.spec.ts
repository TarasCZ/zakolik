import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import { loginComplete } from '@app/core';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loginComplete action', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loginComplete());
  });
});
