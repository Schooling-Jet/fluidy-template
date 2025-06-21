import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[nameDir]',
  host: { '(input)': 'onInputChange()' },
  standalone: true,
})
export class NameDirective {
  @Input() textAction!: 'lower' | 'upper' | 'capitalize';

  constructor(
    private elem: ElementRef
  ) { }

  public onInputChange() {
    const val: string = this.elem.nativeElement.value || '';

    let updated = '';

    if (this.textAction === 'lower') {
      updated = val.toLowerCase();
    } else if (this.textAction === 'upper') {
      updated = val.toUpperCase();
    } else {
      const parts = val.split(' ');
      parts.forEach((part, i) => {
        updated += ((i === 0 ? '' : ' ') + ((part[0]?.toUpperCase() || '') + part.substring(1).toLowerCase()));
      });
    }

    if (val !== updated) {
      this.elem.nativeElement.value = updated;
    }
  }
}
