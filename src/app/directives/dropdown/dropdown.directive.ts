import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from '@services/utilities/utilities.service';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[dropdownTarget]',
  standalone: true,
})
export class DropdownDirective implements OnInit, OnDestroy {
  @Input() dropdownTarget!: string;
  @Input() dropdownClass = 'hidden';
  @Input() mouseAction = false;
  @Input() parent?: string;

  private sub = new Subject<void>();

  constructor(
    private utilities: UtilitiesService,
    private ref: ElementRef,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    if (this.mouseAction && this.parent) {
      const parent = this.document.querySelector(this.parent);
      parent!.addEventListener('mouseenter', () => {
        this.toggleDropdown('remove');
      });

      parent!.addEventListener('mouseleave', () => {
        this.toggleDropdown('add');
      });
    } else {
      this.ref.nativeElement.onclick = () => {
        this.toggleDropdown();
      }
    }

    if (this.parent) {
      fromEvent(this.document, 'click').pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement)
        }),
        takeUntil(this.sub),
      ).subscribe(() => {
        this.toggleDropdown('add');
      });
    } else {
      if (this.mouseAction) {
        this.ref.nativeElement = () => {
          this.utilities.delay(200).then(() => {
            this.toggleDropdown('add');
          });
        }
      } else {
        this.ref.nativeElement.onblur = () => {
          this.utilities.delay(200).then(() => {
            this.toggleDropdown('add');
          });
        }
      }
    }
  }

  private toggleDropdown(act?: 'add' | 'remove'): void {
    const targets = document.querySelectorAll(this.dropdownTarget);

    targets.forEach(elem => {
      switch (act) {
        case 'add': {
          elem.classList.add(this.dropdownClass);
          break;
        }

        case 'remove': {
          elem.classList.remove(this.dropdownClass);
          break;
        }

        default: {
          elem.classList.toggle(this.dropdownClass);
        }
      }
    });
  }

  private isInside(elementToCheck: HTMLElement): boolean {
    const elem = document.querySelector(this.parent!)!;
    return !!(elementToCheck === elem || elem.contains(elementToCheck));
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.unsubscribe();
  }
}
