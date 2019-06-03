import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Transaction} from '@app/transactions/store/transaction.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'zklk-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
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
