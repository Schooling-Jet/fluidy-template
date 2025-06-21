import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandAnimation = trigger('enterTrigger', [
  state('expand', style({
    opacity: '1',
    scale: '100%',
  })),
  transition('void => *', [style({ opacity: '0', scale: '0' }), animate('200ms')])
]);
