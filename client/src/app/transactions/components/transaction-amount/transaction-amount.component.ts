import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';

export enum ColorLevel {
  Red = 'red',
  Redder = 'redder',
  Reddest = 'reddest',
  Green = 'green',
  Greener = 'greener',
  Greenest = 'greenest'
}

@Component({
  selector: 'zklk-transaction-amount',
  templateUrl: './transaction-amount.component.html',
  styleUrls: ['./transaction-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionAmountComponent implements OnChanges {
  @Input()
  value: number;

  @Input()
  currency: string;

  color: string;

  constructor() {}

  ngOnChanges(): void {
    this.color = this.getColorLevel();
  }

  private getColorLevel() {
    const { value } = this;

    if (value < -5000) {
      return ColorLevel.Reddest;
    } else if (value < -1000) {
      return ColorLevel.Redder;
    } else if (value < 0) {
      return ColorLevel.Red;
    } else if (value > 10000) {
      return ColorLevel.Greenest;
    } else if (value > 2000) {
      return ColorLevel.Greener;
    } else if (value > 0) {
      return ColorLevel.Green;
    }
  }
}
