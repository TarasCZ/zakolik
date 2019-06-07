import {animate, query, style, transition, trigger} from '@angular/animations';

export const removeTransactionAnimation = trigger('removeTransactionCard', [
  transition(':leave', [
    query('mat-card', [
      animate('300ms ease-in-out', style({opacity: 0, transform: 'translateY(-10%)', backgroundColor: 'red'})),
    ])
  ])
]);
