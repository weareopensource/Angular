import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routesAnimation = trigger('routesAnimation', [
  transition('home <=> *', [query(':enter', [style({ opacity: 0 }), animate('.3s', style({ opacity: 1 }))])]),
  transition('authentication <=> *', [query(':enter', [style({ opacity: 0 }), animate('.3s', style({ opacity: 1 }))])]),
  transition('tasks-list => task-detail', [
    group([
      query(':enter', [style({ left: '100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '-100%' }))])
    ])
  ]),
  transition('task-detail => tasks-list', [
    group([
      query(':enter', [style({ left: '-100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '100%' }))])
    ])
  ]),
  transition('users-list => user-detail', [
    group([
      query(':enter', [style({ left: '100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '-100%' }))])
    ])
  ]),
  transition('user-detail => users-list', [
    group([
      query(':enter', [style({ left: '-100%' }), animate('0.5s ease-in-out', style({ left: '0' }))]),
      query(':leave', [animate('0.5s ease-in-out', style({ left: '100%' }))])
    ])
  ]),
  transition('users-list <=> task-lists', [query(':enter', [style({ opacity: 0 }), animate('.3s', style({ opacity: 1 }))])])
]);
