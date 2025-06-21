import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInAnimation = trigger('enterTrigger', [
  state('fadeIn', style({
    opacity: '1',
    // transform: 'translateY(50%)'
  })),
  transition('void => *', [style({ opacity: '0' }), animate('800ms')])
]);
