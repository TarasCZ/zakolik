import { Injectable, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import {
  ActionsSubject,
  ReducerManager,
  StateObservable,
  Store,
  StoreModule
} from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import Mock = jest.Mock;

@Injectable()
export class MockStore<T> extends Store<T> {
  private stateSubject = new BehaviorSubject<Partial<T>>({} as Partial<T>);

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
    this.source = this.stateSubject.asObservable();
  }

  setState(nextState: Partial<T>) {
    this.stateSubject.next(nextState);
  }
}

export function provideMockStore() {
  return {
    provide: Store,
    useClass: MockStore
  };
}

@NgModule({
  imports: [
    NoopAnimationsModule,
    RouterTestingModule,
    SharedModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot({})
  ],
  exports: [
    NoopAnimationsModule,
    RouterTestingModule,
    SharedModule,
    TranslateModule
  ],
  providers: [provideMockStore()]
})
export class TestingModule {
  constructor() {}
}

export const createSpyObj = (
  baseName: string,
  methodNames: string[]
): { [key: string]: Mock<any> } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function provideTestActions() {
  return {
    provide: Actions,
    useClass: TestActions
  };
}
