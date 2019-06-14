import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeTheme,
  ActionSettingsChangeStickyHeader
} from '../store/settings.actions';
import { SettingsState, State } from '../store/settings.model';
import { selectSettings } from '../store/settings.selectors';

@Component({
  selector: 'zklk-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'cz', label: 'cz' },
    { value: 'sk', label: 'sk' },
  ];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
  }

  onStickyHeaderToggle({ checked: stickyHeader }) {
    this.store.dispatch(new ActionSettingsChangeStickyHeader({ stickyHeader }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsPage({ pageAnimations })
    );
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(
      new ActionSettingsChangeAnimationsElements({ elementsAnimations })
    );
  }
}
