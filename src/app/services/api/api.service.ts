import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, firstValueFrom, map, Observable } from 'rxjs';
import { UtilitiesService } from '../utilities/utilities.service';
import { environment } from '@env/environment';
import keys from 'lodash-es/keys';
import { ApiResponse, Map, PaginatedQueryOptions, PaginatedQueryResult } from '@models/commons.model';
import { addMilliseconds, isAfter, subMilliseconds } from 'date-fns';
import cloneDeep from 'lodash-es/cloneDeep';

export interface CacheDataFormat<T> {
  id: string;
  obs$: BehaviorSubject<T>;
  lastDate: Date;
}

@Injectable({
  providedIn: 'root'
})
/**
 * A service used to cache/store API responses for faster application load times
 */
export class ApiService {
  public serverTime = new Date();

  private cache: Map<CacheDataFormat<any>> = {}; // route ids map to data formats. Mainly to be used for caching get requests

  constructor(
    private http: HttpClient,
    private utilities: UtilitiesService,
  ) {
    this.maintainServerTime();
  }

  private async maintainServerTime(): Promise<void> {
    const delayInMs = 1000;
    await this.utilities.delay(delayInMs);

    this.serverTime = addMilliseconds(this.serverTime, delayInMs);
    return this.maintainServerTime();
  }

  public clearCache(): void {
    keys(this.cache).forEach(key => {
      this.cache[key].obs$.unsubscribe();
    });

    this.cache = {};
  }

  private setData<T>(path: string, value: T): void {
    if (!this.cache[path]) {
      this.cache[path] = {
        lastDate: undefined as any,
        id: path,
        obs$: new BehaviorSubject(undefined),
      };
    }

    this.cache[path].lastDate = new Date();
    this.cache[path].obs$.next(value);
  }

  private getData<T>(path: string): Observable<T> {
    if (!this.cache[path]) {
      this.setData(path, undefined);
    }

    return this.cache[path].obs$.asObservable().pipe(
      filter(a => a !== undefined),
      delay(20),
      map(a => a ? cloneDeep(a) : a),
    );
  }

  public handleGet<T>(url: string, cacheTimeInMs?: number, reset?: boolean, skipErrorCheck?: boolean): Observable<T> {
    if (reset) {
      this.cache[url] ? this.cache[url].lastDate = new Date(0) : undefined;
      this.cache[url]?.obs$.next(undefined);
    }

    const delay = cacheTimeInMs || environment.storeDefaultCacheTimeInMilliSeconds;
    const ago = subMilliseconds(new Date(), delay);
    const lastDate = this.cache[url]?.lastDate || new Date(0);

    const isActive = isAfter(lastDate, ago);
    if (!isActive) {
      if (this.cache[url]) {
        this.cache[url].lastDate = new Date();
      }

      this.http.get<ApiResponse<any>>(url).subscribe({
        next: res => {
          this.setData<any>(url, res);
          this.serverTime = res.timestamp || this.serverTime;
        },
        error: err => {
          if (err.status === 403 && !skipErrorCheck) {
            // const data: ErrorDataPayload = {
            //   title: 'Unauthorized request',
            //   msg: err.error?.message || errorData['defaultErrorPayload'],
            //   action: { text: 'Go back', route: '/dashboard' }
            // };

            // this.store.signOut();
            // this.clearCache();
            // this.store.saveErrorPayload(data);
            // this.router.navigateByUrl('/app/error');

            console.log(err);
          } else {
            this.setData<any>(url, err.error);
          }
        }
      });
    }

    return this.getData<T>(url);
  }

  public getItemsByUrl<T>(path: string, opts: PaginatedQueryOptions): Observable<ApiResponse<PaginatedQueryResult<T>>> {
    if (path.startsWith('/')) {
      throw Error(`Error: Invalid path. Should not begin with a "/"`);
    }

    const url = this.utilities.appendQueryString(`${environment.apiUrl}${path}`, opts);
    return this.handleGet(url);
  }

  public getItemByUrl<T>(path: string, id: number): Observable<ApiResponse<T>> {
    if (path.startsWith('/')) {
      throw Error(`Error: Invalid path. Should not begin with a "/"`);
    }

    const url = this.utilities.appendQueryString(`${environment.apiUrl}${path}/${id}`, {});
    return this.handleGet(url);
  }

  public async handlePost<R>(url: string, body: Map<any>, opts?: Map<any>): Promise<ApiResponse<R>> {
    try {
      const res = await firstValueFrom(this.http.post<ApiResponse<R>>(url, body, opts));
      this.serverTime = res.timestamp || this.serverTime;
      return res;
    } catch (e: any) {
      console.log(e);
      return e.error;
    }
  }

  public async handleDelete<R>(url: string, opts?: Map<any>): Promise<ApiResponse<R>> {
    try {
      const res = await firstValueFrom(this.http.delete<ApiResponse<R>>(url, opts));
      this.serverTime = res.timestamp || this.serverTime;
      return res;
    } catch (e: any) {
      console.log(e);
      return e.error;
    }
  }

  public async handlePut<R>(url: string, body: Map<any>, opts?: Map<any>): Promise<ApiResponse<R>> {
    try {
      const res = await firstValueFrom(this.http.put<ApiResponse<R>>(url, body, opts));
      this.serverTime = res.timestamp || this.serverTime;
      return res;
    } catch (e: any) {
      console.log(e);
      return e.error;
    }
  }
}
