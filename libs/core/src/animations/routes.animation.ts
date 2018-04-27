import { animate, query, style, transition, trigger } from '@angular/animations';

export const routesAnimation = trigger('routesAnimation', [
  transition('home <=> *', [
    query(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ])
  ]),
  transition('authentication <=> *', [
    query(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ])
  ]),
  transition('users-list <=> *', [
    query(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ])
  ]),
  transition('tasks-list <=> *', [
    query(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ])
  ])
]);
