import { TestBed, async } from '@angular/core/testing';

import { TestingModule } from '@testing/utils.spec';
import { CoreModule, LocalStorageService } from '@app/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AppComponent],
      providers: [LocalStorageService]
    });
  }));

  it('should upsert the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
