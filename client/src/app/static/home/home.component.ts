import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Store } from '@ngrx/store';
import { hideSpinner } from '@app/core/ui/ui.actions';

@Component({
  selector: 'zklk-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    setTimeout(() => this.store.dispatch(hideSpinner()));
  }
}
