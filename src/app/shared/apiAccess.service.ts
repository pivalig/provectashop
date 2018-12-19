import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './AppSettings';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ApiAccessService {

  get storeId(): string {
    return AppSettings.OrganisationCode;
  }


  constructor(
    private httpClient: HttpClient,
    public translate: TranslateService

  ) {

  }


  private getUrl(path: string, withoutStoreId?: boolean): string {

    if (withoutStoreId) {
      return (`${AppSettings.API_ENDPOINT}${path}`);
    } else {

      return (`${AppSettings.API_ENDPOINT}${this.storeId || ""}/` + path);

    }

  }

  private get headers(): HttpHeaders {
    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')

    return _headers;
  }

  genericSearch<T>(path: string, predicate?: string, pathSsuffix?: string): Observable<T> {
    return this.httpClient.get<T>(this.getUrl(`${path}/search`) + (pathSsuffix ? '/' + pathSsuffix : '') + (predicate ? '?' + predicate : ''),
      { headers: this.headers });
  }

  genericRead<T>(path: string, code?: string): Observable<T> {

    return this.httpClient.get<T>(this.getUrl(`${path}/${code || ""}`));
  }

  genericPost<T>(path: string, data: any, withoutStoreId?: boolean): Observable<T> {

    return this.httpClient.post<T>(this.getUrl(`${path}`, withoutStoreId),
      JSON.stringify(data), { headers: this.headers }
    );
  }
  genericGet<T>(path: string, parameters: any, withoutStoreId?: boolean): Observable<T> {

    const _headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.get<T>(this.getUrl(`${path}?${parameters || ""}`, withoutStoreId));
  }


}
