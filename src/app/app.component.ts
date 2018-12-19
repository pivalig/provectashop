import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd, NavigationStart, ActivationStart, ActivatedRoute, PRIMARY_OUTLET, ActivationEnd } from '@angular/router';
import { Organisation } from './entities/index';
import { LinkService } from './shared/link.service';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from './shared/AppSettings';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CommonHelper } from './helpers/CommonHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  subscription: Subscription;

  private routerSub$: Subscription;
  private routerSub2$: Subscription;
  private request;

  @ViewChild(MatSidenav)
  drawer: MatSidenav;
  organisation: Organisation;
  lang: string;
  serverLang: string;
  isLoaded: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location,
    private linkService: LinkService,
    public translate: TranslateService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    CommonHelper.location = location;


    // this.request = this.injector.get(REQUEST);
  }

  
  ngOnDestroy() {
    
    if (this.routerSub$) {
      this.routerSub$.unsubscribe();
    }
    if (this.routerSub2$) {
      this.routerSub2$.unsubscribe();
    }
  }

  initFacebook(){
    
  }

  ngOnInit() {

   

    this.translate.setDefaultLang('ru');

    let userLang = this.translate.currentLang || 'ru';

    AppSettings.currentLang = this.getQueryLanguageCode() || userLang;

    this.setLanguage(this.getQueryLanguageCode() || userLang);

    if (isPlatformBrowser(this.platformId)) {

      this._changeTitleOnNavigation();

      try {
        if (window && navigator) {
          userLang = navigator.language.split('-')[0];
        }
      } catch (e) {
        console.log(e);
      }

    }


    this.lang = this.translate.currentLang;

    this.routerSub2$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params['lang']) {
        this.setLanguage(params['lang']);
      }
    });
  }

  getQueryLanguageCode() {
    const pathArray = this.location.path().split('?');

    let query = pathArray.length > 1 ? pathArray[1] : undefined;

    if (!query || !query.length) {
      return null;

    } else {

      if (query.indexOf('lang=') >= 0) {
        return query.substr(query.indexOf('lang=') + 5, 2) || '';

      } else {
        return null;
      }
    }
  }

  setLanguage(code: string) {

    code = /(ru|en|ro)/.test(code) ? code : 'en';

    try {

      AppSettings.currentLang = code;

      this.translate.use(code).subscribe(() => {

        try {

          this.lang = this.translate.currentLang;


          const pathArray = this.location.path().split('?');

          const path = pathArray[0];

          let query = pathArray.length > 1 ? pathArray[1] : undefined;

          if (!query || !query.length) {
            query = '?lang=' + code;

          } else {

            if (query.indexOf('lang=') >= 0) {
              const langVal = query.substr(query.indexOf('lang=') + 5, 2) || '';
              query = query.replace('lang=' + langVal, 'lang=' + code);
            } else {
              if (query.length) {
                query += '&';
              }
              query += 'lang=' + code;
            }

            if (query && query.indexOf('?') < 0) {
              query = '?' + query;
            }
          }

          this.location.go(path + query || '');
        } catch (e) {
          console.log(e);

        }

      });
    } catch (e) {
      console.log(e);

    }
  }

  private _changeTitleOnNavigation() {
    try {



      if (this.router && this.router.events) {

        this.routerSub$ = this.router.events
          // .filter(event => event instanceof NavigationEnd)
          // .map(() => this.activatedRoute)
          // .map(route => {
          //   while (route.firstChild) route = route.firstChild;
          //   return route;
          // })
          // .filter(route => route.outlet === 'primary')
          // .mergeMap(route => route.data)
          .subscribe((event) => {

            if (event instanceof ActivationStart) {
              // console.log(this.getQueryLanguageCode());
              this.setLanguage(this.getQueryLanguageCode() || AppSettings.currentLang);
            }

            if (event instanceof ActivationEnd) {
              AppSettings.OrganisationCode = event.snapshot.params['storeId'];
            }

            this._setMetaAndLinks(event);
            this.isLoaded = true;

            if (!this.organisation) {
              this.organisation = AppSettings.Organisation;
            }
            if (this.drawer) {
              this.drawer.close();
            }


          });
      }
    } catch (error) {
      console.log('_changeTitleOnNavigation', error);
    }
  }

  private _setMetaAndLinks(event) {

    const metaData = event['meta'] || [];
    const linksData = event['links'] || [];

    for (let i = 0; i < metaData.length; i++) {
      this.meta.updateTag(metaData[i]);
    }

    for (let i = 0; i < linksData.length; i++) {
      this.linkService.addTag(linksData[i]);
    }
  }

  toggleDrawer() {
    if (this.drawer) {

      if (this.drawer.opened) {
        this.drawer.close();
      } else {
        this.drawer.open();

      }

    }
  }

}
