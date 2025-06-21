import { trigger, state, style, transition, animate } from "@angular/animations";

export const slideInAnimation = trigger('enterTrigger', [
  state('slideIn', style({
    opacity: '1',
    transform: 'translateX(0)'
  })),
  transition('void => *', [style({ opacity: '0', transform: 'translateX(200%)' }), animate('500ms')])
]);
