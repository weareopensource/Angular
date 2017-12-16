import { AnimationEntryMetadata } from '@angular/core';
import {trigger, state, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition: AnimationEntryMetadata =
trigger('routerTransition', [
  state('detail', style({ top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, .3)' })),
  transition('* => detail', [
    group([
      query(
        ':self', [
        style({ top: 0, bottom: 0, left: 0, right: 0 }),
        animate('0.5s ease-in-out', style({ top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, .3)' }))
      ]),
      query(
        ':enter', [
          style({ transform: 'scale3d(.5, .5, .5)', opacity: 0 }),
          animate('0.5s ease-in-out', style({ transform: 'scale3d(1, 1, 1)', opacity: 1 }))
        ],
        { optional: true })
    ])
  ]),
  transition('detail => *', [
    group([
      query(
        ':self', [
        style({ top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, .3)' }),
        animate('0.5s ease-in-out', style({ top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0)' }))
      ]),
      query(
        ':leave', [
          animate('0.5s ease-in-out', style({ transform: 'scale3d(.5, .5, .5)', opacity: 0 })),
        ],
        { optional: true }),
    ])
  ])
]);
