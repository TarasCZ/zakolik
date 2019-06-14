import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { settingsReducer } from './store/settings.reducer';
import { SettingsEffects } from './store/settings.effects';
import { SettingsContainerComponent } from './components/settings-container.component';
import {SettingsDataService} from '@app/settings/services/settings-data.service';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ],
  providers: [SettingsDataService],
  declarations: [SettingsContainerComponent]
})
export class SettingsModule {}
