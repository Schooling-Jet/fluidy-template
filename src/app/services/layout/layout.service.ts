import { Injectable } from '@angular/core';
import { Map } from '@models/commons.model';
import keys from 'lodash-es/keys';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public window$ = new BehaviorSubject({ width: 0, height: 0, scroll: 0 });

  constructor() { }

  public init(): void {
    this.setWindowOpts();

    // fires whenever window is resized
    window.onresize = () => {
      this.setWindowOpts();
    }

    // fires whenever the page is scrolled
    document.body.addEventListener('scroll', () => {
      this.setWindowOpts();
    });
  }

  private setWindowOpts(): void {
    const opts = this.window$.getValue();

    opts.width = window.innerWidth;
    opts.height = window.innerHeight;
    opts.scroll = document.body.scrollTop;
    this.window$.next(opts);
  }

  private adjustColor(hex: string, percent: number): string {
    // Remove # if present
    hex = hex.replace('#', '');

    // Parse the hex into RGB
    let num = parseInt(hex, 16);
    let R = (num >> 16);
    let G = (num >> 8) & 0x00FF;
    let B = num & 0x0000FF;

    // Calculate adjustment amount
    let amt = Math.round(2.55 * percent);

    // Apply adjustment and clamp values
    R = Math.max(0, Math.min(255, R + amt));
    G = Math.max(0, Math.min(255, G + amt));
    B = Math.max(0, Math.min(255, B + amt));

    // Convert back to hex
    return (
      '#' +
      (1 << 24 | (R << 16) | (G << 8) | B)
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }

  public changeThemeColors(obj: Map<string>): void {
    if (obj['primary']) {
      obj['primary-light'] = this.adjustColor(obj['primary'], 20);
      obj['primary-thick'] = this.adjustColor(obj['primary'], -20);
    }

    if (obj['secondary']) {
      obj['secondary-light'] = this.adjustColor(obj['secondary'], 20);
      obj['secondary-thick'] = this.adjustColor(obj['secondary'], -20);
    }

    for (const key of keys(obj)) {
      document.documentElement.style.setProperty(`--color-${key}`, obj[key]);
    }
  }
}
