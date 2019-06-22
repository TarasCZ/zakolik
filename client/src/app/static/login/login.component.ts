import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState, login } from '@app/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'zklk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(login());
  }
}
