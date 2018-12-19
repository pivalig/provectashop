import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './AppSettings';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public router: Router,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (AppSettings.AccessToken && AppSettings.AccessToken.length
            && (request.url.indexOf('https://provectapos.com') == 0 || request.url.indexOf('http://localhost') == 0)) {
            request = request.clone({
                setHeaders: {
                    // 'Token': `Bearer ${AppSettings.AccessToken}`
                    'Token': AppSettings.AccessToken
                }
            });
        }

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {

                    if (isPlatformBrowser(this.platformId)) {

                        localStorage.removeItem(`user`);
                        localStorage.removeItem(`token`);
                    }
                    this.router.navigate(['/login', { backref: encodeURIComponent(this.router.url) }]);
                    // redirect to the login route
                    // or show a modal
                }
            }
        });
    }
}