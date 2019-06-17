import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionAuthLogout, AppState } from '@app/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'zklk-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new ActionAuthLogout());
  }
}
