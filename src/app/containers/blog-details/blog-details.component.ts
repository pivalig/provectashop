import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContainerBase } from "../ContainerBase";
import { Post, GenericOutput} from '../../entities/index';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { SeoService } from '../../shared/seo.service';
//import { ShareButtonsService } from 'ngx-sharebuttons';
import { CommonHelper } from '../../helpers/CommonHelper';
import * as $ from 'jquery';

@Component({
    selector: 'blog-details',
    styleUrls: ['./blog-details.component.scss'],
    templateUrl: './blog-details.component.html'

})
export class BlogDetailsComponent extends ContainerBase {

    blog: Post;
    blogCode: string;
    isLoading: boolean;

    constructor(
        private seoService: SeoService,
        @Inject(PLATFORM_ID) public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public translate: TranslateService,
        public api: ApiAccessService) {

      super(platformId, activatedRoute, api);

        this.subscriptions.push(this.routeOkEvent.subscribe(params => {
                this.blogCode = params.blogCode;
                this.getBlog();
            },
            error => {
                console.error(error);
            }));
    }

    setMeta() {
        if (this.blog) {
            this.seoService.setTitle(this.blog.Title);

            this.seoService.setDescription(this.blog.Subject);

            if (this.blog.Filestreams) {
                const defaultImage = this.blog.Filestreams.find(x => x.IsDefault) || this.blog.Filestream;
                this.seoService.setMeta("og:image", CommonHelper.getImageSrc(defaultImage));
            }

            this.seoService.setMeta("og:type", "article");
        }
    }

    getBlog() {
        this.isLoading = true;
        this.api.genericRead<Post>('post', this.blogCode)
            .subscribe((r: Post) => {
                    this.blog = r;
                    this.isLoading = false;


                    if (this.isClient) {
                      $("html, body").animate({ scrollTop: 0 }, "fast");
                    }

                    this.setMeta();

                },
                error => {
                    console.error(error);
                    this.isLoading = false;
                });

    }
}
