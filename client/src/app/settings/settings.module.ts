import { InjectionToken, NgModule } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  StoreModule
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { settingsReducer } from './store/settings.reducer';
import { SettingsEffects } from './store/settings.effects';
import { SettingsContainerComponent } from './components/settings-container.component';
import { SettingsDataService } from '@app/settings/services/settings-data.service';
import { AppState, authReducer } from '@app/core';
import { routerReducer } from '@ngrx/router-store';
import { uiReducer } from '@app/core/ui/ui.reducer';
import { SettingsState, State } from '@app/settings/store/settings.model';

export const SETTINGS_REDUCER = new InjectionToken<
  ActionReducer<SettingsState, Action>
>('Settings reducers token', {
  factory: () => settingsReducer
});

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('settings', SETTINGS_REDUCER),
    EffectsModule.forFeature([SettingsEffects])
  ],
  providers: [SettingsDataService],
  declarations: [SettingsContainerComponent]
})
export class SettingsModule {}
