import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Token, Post, PostActionType, GenericOutput } from '../../entities/index';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SliderComponent } from "../../components/slider/slider";
import { ContainerBase } from "../ContainerBase";
import { ApiAccessService } from '../../shared/apiAccess.service';
import { AppSettings } from '../../shared/AppSettings';
import { SeoService } from '../../shared/seo.service';
import { CommonHelper } from '../../helpers/CommonHelper';

import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'

})
export class HomeComponent extends ContainerBase {

  showProducts: boolean;
  loading: boolean;
  posts: Array<Post>;

  @ViewChild(SliderComponent) slider: SliderComponent;

  constructor( @Inject(PLATFORM_ID) public platformId: Object,
    public activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    public router: Router,
    public api: ApiAccessService,
    public translate: TranslateService) {

    super(platformId, activatedRoute, api);

    this.subscriptions.push(this.routeOkEvent.subscribe(params => {
      if (params['storeId'] == 'null' || params['storeId'] == 'undefined') {
        this.router.navigate(['/']);

      } else {
    this.showProducts = true;
        this.getSlides();
        if (AppSettings.Organisation) {
          this.seoService.setTitle(AppSettings.Organisation.Name);
          this.seoService.setMeta("og:site_name", `ProvectaPOS - ${AppSettings.Organisation.Name}`);

          if (AppSettings.Organisation.Filestream) {
            this.seoService.setMeta("og:image", CommonHelper.getImageSrc(AppSettings.Organisation.Filestream));
          }


        }
      }
    }));

  }

  inititalize() {
    this.loading = true;
  }


  getSlides() {

    this.api.genericSearch<GenericOutput<Post>>('post')
      .subscribe(r => {
        this.posts = r.Entities;


      },
      error => {
        console.error(error);
      });
  }

  productsLoaded(event: any) {
    this.loading = false;
  }

}
