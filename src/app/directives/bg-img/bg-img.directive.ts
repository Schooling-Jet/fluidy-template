import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UtilitiesService } from '@services/utilities/utilities.service';

@Directive({
  selector: '[bgImg]',
  standalone: true,
})
export class BgImgDirective implements OnInit, OnChanges {
  @Input() bgImg!: string;
  @Input() class!: string;

  constructor(
    private ref: ElementRef,
    private utilities: UtilitiesService,
  ) { }

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.bgImg && this.utilities.isNewChange(changes, ['bgImg'])) {
      const elem = this.ref.nativeElement as HTMLElement;
      elem.style.backgroundImage = `url('${this.bgImg}')`;
    }
  }
}
