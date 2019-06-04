import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Transaction} from '@app/transactions/store/transaction.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {openCloseAnimation} from '@app/core/animations/open-close.animations';

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

  @Input() transaction: Transaction;

  @Output() select = new EventEmitter<{id: string, isSelected: boolean}>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitSelect() {
    this.select.emit({
      id: this.transaction.id,
      isSelected: this.transaction.isSelected
    });
  }

  emitEditClick() {
    this.edit.emit(this.transaction.id);
  }

  emitRemoveClick() {
    this.remove.emit(this.transaction.id)
  }
}
