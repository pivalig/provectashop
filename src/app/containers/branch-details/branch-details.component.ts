import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContainerBase } from "../ContainerBase";
import { Branch, GenericOutput } from '../../entities/index';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { SeoService } from '../../shared/seo.service';
import * as $ from 'jquery';
import { CommonHelper } from '../../helpers/CommonHelper';

@Component({
    selector: 'branch-details',
    styleUrls: ['./branch-details.component.scss'],
    templateUrl: './branch-details.component.html'
})
export class BranchDetailsComponent extends ContainerBase {

    branch: Branch;
    branchCode: string;
    markerIcon: string = 'https://jammyapp.com/Content/images/marker-icon.png';
    filestreams: Array<any>;

    constructor(
        private seoService: SeoService,
        @Inject(PLATFORM_ID) public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public translate: TranslateService,
        public api: ApiAccessService) {

      super(platformId, activatedRoute, api);

        this.subscriptions.push(this.routeOkEvent.subscribe(params => {
                //console.log(params);
                this.branchCode = params.branchCode;
                this.getBranch();
            },
            error => {
                console.error(error);
            }));
    }

    getBranch() {

        this.api.genericRead('branch', this.branchCode).subscribe((r: Branch) => {
                this.branch = r;

                if (this.isClient) {
                    $("html, body").animate({ scrollTop: 0 }, "fast");
                }

                this.setMeta();
            },
            error => {
                console.error(error);
            });

    }

    hasLocation(): boolean {
        return this.branch && this.branch.Latitude != 0 && this.branch.Longitude != 0;
    }


    setMeta() {

      if (this.branch) {
        this.seoService.setTitle(CommonHelper.getDataSense(this.branch.Names, this.branch.Name));

        this.seoService.setDescription(CommonHelper.getDataSense(this.branch.Descriptions, this.branch.Description));

        if (this.branch.Filestreams) {
          const defaultImage = this.branch.Filestreams.find(x => x.IsDefault) || this.branch.Filestream;
          this.seoService.setMeta("og:image", CommonHelper.getImageSrc(defaultImage));
        }

        if (this.hasLocation()) {
          this.seoService.setMeta("geo.position", `${this.branch.Latitude},${this.branch.Longitude}`);

        }

      }
    }

}
