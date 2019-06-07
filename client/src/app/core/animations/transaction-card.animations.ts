import {animate, query, sequence, state, style, transition, trigger} from '@angular/animations';

const openCloseAnimation = trigger('openClose', [
  state('closed', style({ opacity: 0, height: 0 })),
  transition('closed => open', [
    sequence([
      animate('300ms ease-in-out', style({ height: '*' })),
      animate('200ms ease-in-out', style({ opacity: 1 }))
    ])
  ]),
  transition('open => closed', [
    sequence([
      animate('200ms ease-in-out', style({ opacity: 0 })),
      animate('300ms ease-in-out', style({ height: 0 })),
    ])
  ])
])

const removeTransactionAnimation = trigger('removeTransactionCard', [
  transition(':leave', [
    query('mat-card', [
      animate('300ms ease-in-out', style({opacity: 0, transform: 'translateY(-10%)', backgroundColor: 'red'})),
    ])
  ])
]);

export const transactionCardAnimations = [
  openCloseAnimation,
  removeTransactionAnimation
];
