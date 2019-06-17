import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCalendarAlt,
  faCar,
  faChartPie,
  faCheck,
  faCog,
  faConciergeBell,
  faEdit,
  faFilter,
  faFlagCheckered,
  faHome,
  faHouseDamage,
  faLanguage,
  faLaughBeam,
  faMoneyBillWave,
  faPaintBrush,
  faPhone,
  faPlus,
  faPowerOff,
  faRocket,
  faShoppingCart,
  faStream,
  faTachometerAlt,
  faTimes,
  faTrash,
  faUserCircle,
  faUtensils,
  faWallet,
  faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import { StopClickPropagationDirective } from '@app/shared/directives/stop-click-propagation.directive';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faFilter,
  faCheck,
  faLanguage,
  faPaintBrush,
  faWindowMaximize,
  faStream,
  faPhone,
  faCar,
  faWallet,
  faHome,
  faUtensils,
  faShoppingCart,
  faHouseDamage,
  faConciergeBell,
  faMoneyBillWave,
  faLaughBeam,
  faCalendarAlt,
  faFlagCheckered,
  faChartPie,
  faTachometerAlt
);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,

    FontAwesomeModule
  ],
  declarations: [StopClickPropagationDirective],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,

    FontAwesomeModule,

    StopClickPropagationDirective
  ]
})
export class SharedModule {}
