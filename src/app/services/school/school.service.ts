import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Album, ApiResponse, ContactMessage, FAQ, PaginatedQueryOptions, PaginatedQueryResult } from '@models/commons.model';
import { School } from '@models/school.model';
import { ApiService } from '@services/api/api.service';
import { UtilitiesService } from '@services/utilities/utilities.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  constructor(
    private api: ApiService,
    private utilities: UtilitiesService,
  ) { }

  public getCurrentSchool(reset?: boolean): Observable<ApiResponse<School>> {
    const url = this.utilities.appendQueryString(environment.apiUrl + 'info', {});
    return this.api.handleGet(url, undefined, reset);
  }

  public getPhotoAlbums(opts: PaginatedQueryOptions, reset?: boolean): Observable<ApiResponse<PaginatedQueryResult<Album>>> {
    const url = this.utilities.appendQueryString(environment.apiUrl + 'albums', { ...opts });
    return this.api.handleGet(url, undefined, reset);
  }

  public getFAQs(opts: PaginatedQueryOptions, reset?: boolean): Observable<ApiResponse<PaginatedQueryResult<FAQ>>> {
    const url = this.utilities.appendQueryString(environment.apiUrl + 'faqs', { ...opts });
    return this.api.handleGet(url, undefined, reset);
  }

  public sendContactMessage(data: ContactMessage): Promise<ApiResponse<void>> {
    const url = this.utilities.appendQueryString(environment.apiUrl + 'contact', {});
    return this.api.handlePost(url, data);
  }

  public subscribeNewsletter(email: string): Promise<ApiResponse<void>> {
    const url = this.utilities.appendQueryString(environment.apiUrl + 'subscribe-school-newsletter', {});
    return this.api.handlePost(url, { email });
  }
}
