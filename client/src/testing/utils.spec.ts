import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

export function provideDummyHammerLoader() {
  return {
    provide: HAMMER_LOADER,
    useValue: () => new Promise(() => {})
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
  providers: [provideMockStore(), provideDummyHammerLoader()]
})
export class TestingModule {
  constructor() {}
}

export const createSpyObj = (baseName: string, methodNames: string[]) => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

export function expectEffectFactory(metadata) {
  return (effect: string) => {
    return {
      toBeAbleToDispatchAction: () =>
        expect(metadata[effect]).toEqual({
          dispatch: true,
          resubscribeOnError: true
        }),
      not: {
        toBeAbleToDispatchAction: () =>
          expect(metadata[effect]).toEqual({
            dispatch: false,
            resubscribeOnError: true
          })
      }
    };
  };
}
