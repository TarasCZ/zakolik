import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Transaction} from '@app/transactions/store/transaction.model';
import {ROUTE_ANIMATIONS_ELEMENTS} from '@app/core';
import {animate, query, sequence, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'zklk-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('closed', style({ opacity: 0, height: 0 })),
      transition('closed => open', [
        sequence([
          animate('400ms ease-in-out', style({ height: '*' })),
          animate('300ms ease-in-out', style({ opacity: 1 }))
        ])
      ]),
      transition('open => closed', [
        sequence([
          animate('300ms ease-in-out', style({ opacity: 0 })),
          animate('400ms ease-in-out', style({ height: 0 })),
        ])
      ])
    ])
  ]
})
export class TransactionCardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  dateFormat = 'dd. MM. yyyy'; // TODO: Move to settings
  isOpen = false;

  @Input() transaction: Transaction;

  @Output() select = new EventEmitter<{id: string, isSelected: boolean}>();
  @Output() edit = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitSelect() {
    this.isOpen = !this.isOpen;
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

  consoleLog(event) {
    console.log(event)
  }
}
