import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContainerBase } from "../ContainerBase";
import { Branch, GenericOutput } from '../../entities/index';
import { ApiAccessService } from '../../shared/apiAccess.service';

@Component({
    selector: 'branches',
    styleUrls: ['./branches.component.scss'],
    templateUrl: './branches.component.html'
})
export class BranchesComponent extends ContainerBase  {


    branches: Array<Branch>;

    constructor(
        @Inject(PLATFORM_ID) public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public translate: TranslateService,
        public api: ApiAccessService) {

      super(platformId, activatedRoute, api);

        this.subscriptions.push(this.routeOkEvent.subscribe(params => {
            //console.log(params);
            this.getBrances();
        }));
    }

    getBrances() {

        this.api.genericSearch('branch').subscribe((r : GenericOutput<Branch>) => {
            this.branches = r.Entities;
        });

    }

//    public setLanguage(lang) {
//        this.translate.use(lang);
//    }

}
