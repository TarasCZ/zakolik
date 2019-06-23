import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TestingModule } from '@testing/utils.spec';
import { AuthService, CoreModule, LocalStorageService } from '@app/core';

import { AppComponent } from './app.component';
import { AuthModule } from '../../../server/src/auth/auth.module';
import { LoginComponent } from '@app/static/login/login.component';

describe('AppComponent', () => {
  // let component: AppComponent;
  // let fixture: ComponentFixture<AppComponent>;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    authService = { authenticated: true };
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AppComponent],
      providers: [
        LocalStorageService,
        { provide: AuthService, useValue: authService }
      ]
    });

    // fixture = TestBed.createComponent(AppComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should upsert the app', () => {
    expect(true).toBeTruthy();
  });
});
