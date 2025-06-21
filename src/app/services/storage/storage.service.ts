import { Injectable } from '@angular/core';

export const localStorageProps = {
  COLOR_THEME: 'trffiewddjgghv',
}

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { }

  public getItem(key: string): string {
    return localStorage.getItem(key) || '';
  }

  public setItem(key: string, val: string): void {
    localStorage.setItem(key, val);
  }
}
