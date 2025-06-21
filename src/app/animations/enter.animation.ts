import { trigger, transition, style, animate } from '@angular/animations';

// x = slide in from any side
// opacity = 

export const enterAnimation = trigger(
  'enterAnimation', [
  // state('in',
  //   style({ width: '{{ inWidth }}', overflow: 'hidden' }),
  //   { params: { inWidth: '250px' } }
  // ),
  // state('out',
  //   style({ width: '{{ outWidth }}' }),
  //   { params: { outWidth: '1000px' } }
  // ),
  // transition('* <=> *',
  //   animate('{{ time }}'),
  //   { params: { time: '350ms' } }
  // ),
  transition(
    ':enter', [
    style({
      transform: 'translateX({{xStart}})',
      opacity: '{{opacityStart}}',
      // height: '{{heightStart}}',
      // width: '{{widthStart}}',
    }),
    animate('{{duration}}', style({
      transform: 'translateX({{xEnd}})',
      opacity: '{{opacityEnd}}',
      // height: '{{heightEnd}}',
      // width: '{{widthEnd}}',
    })),
  ],
    {
      params: {
        xStart: '0',
        xEnd: '0',
        opacityStart: 0,
        opacityEnd: 1,
        // widthStart: '100%',
        // widthEnd: '100%',
        // heightStart: '100%',
        // heightEnd: '100%',
        duration: '300ms',
      }
    }
  ),
  // transition(':leave', [
  //   style({ transform: 'translateX(0)', opacity: 1 }),
  //   animate('350ms', style({ transform: 'translateX(100%)', opacity: 0 }))
  // ]),
]);
