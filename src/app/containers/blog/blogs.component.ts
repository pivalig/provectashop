import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContainerBase } from "../ContainerBase";
import { Post, GenericOutput } from '../../entities/index';
import { ApiAccessService } from '../../shared/apiAccess.service';

@Component({
    selector: 'blogs',
    styleUrls: ['./blogs.component.scss'],
    templateUrl: './blogs.component.html'
})
export class BlogsComponent extends ContainerBase {

    searchResult: GenericOutput<Post>;
    isLoading: boolean;
    currentPage = 0;

    constructor(
        @Inject(PLATFORM_ID) public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public translate: TranslateService,
        public api: ApiAccessService) {

      super(platformId, activatedRoute, api);

        this.subscriptions.push(this.routeOkEvent.subscribe(params => {
            this.getPosts();
        }));
    }

    getPosts(event?: any) {

        this.isLoading = !!event;

        let predicate = '';

        let page = this.currentPage;

        if (event && event.page > 0) {
            page = event.page;
        }

        if (page) {
            predicate = 'Page=' + (page - 1);
        }

        if (predicate.length > 0) {
            predicate += '&';
        }

        predicate += 'type=4';


        this.api.genericSearch('post', predicate).subscribe((r: GenericOutput<Post>) => {
                this.searchResult = r;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                console.log(error);
            });

    }

}
