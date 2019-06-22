import { TestBed } from '@angular/core/testing';
import { AppState, AuthService } from '@app/core';
import { Store, StoreModule } from '@ngrx/store';
import { AuthGuardService } from './auth-guard.service';
import { AuthState } from './store/auth.models';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthGuardService', () => {
  let authServiceMock;
  let authService;
  let routerMock;
  let authGuardService: AuthGuardService;
  let store: MockStore<AppState>;
  let state: AppState;

  const authState: AuthState = {
    isAuthenticated: false
  };

  beforeEach(() => {
    authServiceMock = { authenticated: false };
    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        AuthGuardService,
        provideMockStore(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authGuardService = TestBed.get<AuthGuardService>(AuthGuardService);
    authService = TestBed.get<AuthService>(AuthService);
    store = TestBed.get(Store);
    state = createState(authState);
    store.setState(state);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return true if only the store isAuth is true', async () => {
    store.setState(createState({ isAuthenticated: true }));

    expect(await authGuardService.canLoad().toPromise()).toBeTruthy();
  });

  it('should return true if only the service isAuth is true', async () => {
    authService.authenticated = true;

    expect(await authGuardService.canLoad().toPromise()).toBeTruthy();
  });

  describe('when both of store and service isAuth is false', () => {
    let canLoadResult: boolean;

    beforeEach(
      async () => (canLoadResult = await authGuardService.canLoad().toPromise())
    );

    it('should return false', () => {
      expect(canLoadResult).toBeFalsy();
    });

    it('should redirect to home', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    });
  });
});

function createState(authState: AuthState) {
  return {
    auth: authState
  } as AppState;
}
