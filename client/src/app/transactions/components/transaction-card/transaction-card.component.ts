import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  Transaction,
  TransactionTypeIcons
} from '@app/transactions/model/transaction.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { openCloseAnimation } from '@app/core/animations/transaction-card.animations';

@Component({
  selector: 'zklk-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openCloseAnimation]
})
export class TransactionCardComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  TransactionTypeIcons = TransactionTypeIcons;
  currencyTag = 'Kč';
  isSelected = false;

  @Input() transaction: Transaction;

  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  constructor() {}

  toggleSelect() {
    this.isSelected = !this.isSelected;
  }

  emitEditClick() {
    this.edit.emit(this.transaction.id);
  }

  emitRemoveClick() {
    this.remove.emit(this.transaction.id);
  }
}
