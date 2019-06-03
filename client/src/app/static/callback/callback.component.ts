import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActionAuthLoginComplete, AppState} from '@app/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'zklk-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallbackComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionAuthLoginComplete());
  }
}

