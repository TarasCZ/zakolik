import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from '@app/transactions/store/transaction.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {openCloseAnimation} from '@app/core/animations/transaction-card.animations';

@Component({
  selector: 'zklk-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openCloseAnimation]
})
export class TransactionCardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  dateFormat = 'dd. MM. yyyy'; // TODO: Move to settings
  currencyTag = 'Kč';
  isSelected = false;

  @Input() transaction: Transaction;

  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
  }

  emitEditClick() {
    this.edit.emit(this.transaction.id);
  }

  emitRemoveClick() {
    this.remove.emit(this.transaction.id)
  }
}
