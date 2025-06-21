import { Injectable, SimpleChanges } from '@angular/core';
import { Map } from '@models/commons.model';
import isEqual from 'lodash-es/isEqual';
import { delay, firstValueFrom, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor() { }

  public delay(dur: number): Promise<any> {
    return firstValueFrom(of(null).pipe(delay(dur), take(1)));
  }

  public isNewChange(data: SimpleChanges, props: string[]): boolean {
    for (const prop of props) {
      const bef = data[prop]?.previousValue;
      const af = data[prop]?.currentValue;

      if (!isEqual(bef, af)) {
        return true;
      }
    }

    return false;
  }

  public getRandomString(size: number = 50, chars?: string): string {
    const result: string[] = [];
    const possibleCharacters = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charSize = possibleCharacters.length;

    for (let i = 0; i < size; i++) {
      result.push(
        possibleCharacters.charAt(Math.floor(Math.random() * charSize)),
      );
    }

    return result.join('');
  }

  public isValidDomainName(name: string): boolean {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return regex.test(name);
  }

  public isValidEmail(email: string): boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  public isValidUrl(url: string): boolean {
    // const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'/;
    // return !!url.match(regex);

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    return !!url.match(regex);
  }

  public appendQueryString(url: string, params: Map<any>): string {
    let result = url + '?';

    params['api'] = 1;
    for (const field in params) {
      result += `${field}=${params[field]}&`;
    }

    return result.substring(0, result.length - 1);
  }

  public getKeysForEnum(enumObj: Object): number[] {
    const results: number[] = [];
    Object.keys(enumObj).map((type) => {
      if (!isNaN(parseInt(type, 10))) {
        results.push(parseInt(type, 10));
      }
    });

    return results;
  }

  public getValuesForEnum(enumObj: Object): string[] {
    const results: string[] = [];
    Object.keys(enumObj).map((type) => {
      if (isNaN(parseInt(type, 10))) {
        results.push(type);
      }
    });

    return results;
  }
}
