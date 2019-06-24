import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { SettingsContainerComponent } from './settings-container.component';
import * as SettingsActions from '../store/settings.actions';
import { MockStore } from '@ngrx/store/testing';

describe('SettingsComponent', () => {
  let component: SettingsContainerComponent;
  let fixture: ComponentFixture<SettingsContainerComponent>;
  let store: MockStore<any>;
  let dispatchSpy;

  const getThemeSelectArrow = () =>
    fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1];
  const getSelectOptions = () =>
    fixture.debugElement.queryAll(By.css('mat-option'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [SettingsContainerComponent]
    });

    store = TestBed.get(Store);
    store.setState({
      settings: {
        theme: 'BLACK-THEME',
        autoNightMode: true,
        stickyHeader: true,
        pageAnimations: true,
        pageAnimationsDisabled: false,
        elementsAnimations: true,
        language: 'en'
      }
    });
    fixture = TestBed.createComponent(SettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch change language action on language selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');

    const languageSelect = fixture.debugElement.query(
      By.css('[data-testid="language-select"]')
    );
    const languageSelectArrow = languageSelect.query(
      By.css('.mat-select-trigger')
    );
    languageSelectArrow.triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      SettingsActions.changeLanguage({ language: 'cz' })
    );
  });

  it('should dispatch change sticky header on sticky header toggle', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.query(
      By.css('[data-testid="sticky-header-toggle"]')
    );

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      SettingsActions.changeStickyHeader({ stickyHeader: false })
    );
  });

  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    getThemeSelectArrow().triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      SettingsActions.changeTheme({ theme: 'NATURE-THEME' })
    );
  });

  it('should dispatch change animations page', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.query(
      By.css('[data-testid="animations-page-toggle"]')
    );

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      SettingsActions.changeAnimationsPage({ pageAnimations: false })
    );
  });

  it('should dispatch change animations elements', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.query(
      By.css('[data-testid="animations-elements-toggle"]')
    );

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      SettingsActions.changeAnimationsElements({ elementsAnimations: false })
    );
  });

  it('should disable change animations page when disabled is set in state', () => {
    store.setState({
      settings: {
        theme: 'BLACK-THEME',
        autoNightMode: true,
        pageAnimations: true,
        pageAnimationsDisabled: true, // change animations disabled
        elementsAnimations: true,
        language: 'en'
      }
    });
    fixture.detectChanges();

    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.query(
      By.css('[data-testid="animations-page-toggle-disabled"]')
    );

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
