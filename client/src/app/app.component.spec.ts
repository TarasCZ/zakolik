import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { AppState, AuthService, LocalStorageService, logout } from '@app/core';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { registerFrLocale } from '@app/app.module';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { changeAnimationsPageDisabled, changeLanguage } from '@app/settings';
import { showSpinner } from '@app/core/ui/ui.actions';
import { MAT_DATE_LOCALE } from '@angular/material';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: Partial<AuthService>;
  let store: MockStore<AppState>;
  let browserName: string;

  beforeEach(() => {
    browserName = 'chrome';
    require('browser-detect').default = () => ({ name: browserName });
    registerFrLocale();
    authService = { authenticated: true };
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AppComponent],
      providers: [
        LocalStorageService,
        { provide: MAT_DATE_LOCALE, useValue: 'fr' },
        { provide: AuthService, useValue: authService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch changeAnimationsPageDisabled action with false', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      changeAnimationsPageDisabled({
        pageAnimationsDisabled: false
      })
    );
  });

  it('should dispatch changeAnimationsPageDisabled action with true when unsupported browser detected', () => {
    ['ie', 'edge', 'safari'].forEach(browser => {
      browserName = browser;
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(
        changeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    });
  });

  it('should dispatch changeLanguage action on lagnuage select', () => {
    component.onLanguageSelect({ value: 'en' });

    expect(store.dispatch).toHaveBeenCalledWith(
      changeLanguage({ language: 'en' })
    );
  });

  describe('when logout', () => {
    beforeEach(() => component.onLogoutClick());

    it('should dispatch showSpinner action', () =>
      expect(store.dispatch).toHaveBeenCalledWith(showSpinner()));

    it('should dispatch logout action', () =>
      expect(store.dispatch).toHaveBeenCalledWith(logout()));
  });
});
