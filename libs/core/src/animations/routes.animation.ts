import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routesAnimation = trigger('routesAnimation', [
  transition('home <=> *', [query(':enter', [style({ opacity: 0 }), animate('.3s', style({ opacity: 1 }))])]),
  transition('authentication <=> *', [query(':enter', [style({ opacity: 0 }), animate('.3s', style({ opacity: 1 }))])]),
  transition('list => detail', [
    group([
      query(':enter', [style({ left: '100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '-100%' }))])
    ])
  ]),
  transition('detail => list', [
    group([
      query(':enter', [style({ left: '-100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '100%' }))])
    ])
  ]),
  transition('list => add', [
    group([
      query(':enter', [style({ left: '100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '-100%' }))])
    ])
  ]),
  transition('add => list', [
    group([
      query(':enter', [style({ left: '-100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '100%' }))])
    ])
  ]),
  transition('profile <=> *', [query(':enter', [style({ opacity: 0 }), animate('.3s', style({ opacity: 1 }))])])
]);
