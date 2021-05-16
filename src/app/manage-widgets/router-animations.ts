import {
    trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';

export const slideInAndOutAnimations =
  trigger('routerAnimations', [
    transition('WidgetList => AddWidget', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-in-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('400ms ease-in-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('WidgetList => DeleteWidget', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('400ms ease-in-out', style({ right: '100%' }))
          ]),
          query(':enter', [
            animate('400ms ease-in-out', style({ right: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    transition('AddWidget => WidgetList', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('400ms ease-in-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('400ms ease-in-out', style({ left: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('DeleteWidget => WidgetList', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('400ms ease-in-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('400ms ease-in-out', style({ left: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ])
  ]);
