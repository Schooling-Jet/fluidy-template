import { trigger, state, style, transition, animate } from "@angular/animations";

export const slideBottomAnimation = trigger('enterTrigger', [
  state('slideBottom', style({
    opacity: '1',
    transform: 'translateY(0)'
  })),
  transition('void => *', [style({ opacity: '0', transform: 'translateY(200%)' }), animate('500ms')])
]);
