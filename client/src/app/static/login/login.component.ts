import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';
import { AppState, login } from '@app/core';
import { Store } from '@ngrx/store';
import { showSpinner } from '@app/core/ui/ui.actions';

@Component({
  selector: 'zklk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    setTimeout(() => this.store.dispatch(showSpinner()));
    this.store.dispatch(login());
  }
}
