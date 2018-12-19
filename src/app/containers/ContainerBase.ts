import { Component, OnInit, Inject, OnDestroy, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AppSettings } from '../shared/AppSettings';
import { Organisation } from "../entities/index";
import { ApiAccessService } from '../shared/apiAccess.service';

export class ContainerBase implements OnInit, OnDestroy {

    public isClient: boolean;
    public routeOkEvent: EventEmitter<any> = new EventEmitter<any>();
    public subscriptions: Array<any> = [];
    public organisationCode: string;
    public url: String;
    public storeId: string;


    constructor(
        public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public api: ApiAccessService
    ) {

        this.subscriptions.push(api.translate.onLangChange.subscribe(() => {

            setTimeout(() => {
                this.setUrl();
                this.setMeta();
            }, 200);
        }));
    }

    setMeta() {
    }


    ngOnInit() {

        this.inititalize();

        if (isPlatformBrowser(this.platformId)) {
            this.isClient = true;
        }

        if (this.activatedRoute) {


            if (this.activatedRoute.snapshot &&
                this.activatedRoute.snapshot.children &&
                this.activatedRoute.snapshot.children[0] &&
                this.activatedRoute.snapshot.children[0].params['storeId']) {


                AppSettings.OrganisationCode = this.organisationCode =
                    this.activatedRoute.snapshot.children[0].params['storeId'];

                //        this.url = encodeURIComponent(this.activatedRoute.snapshot.firstChild.url[0].path);

                debugger;
                this.emitRouteOk(this.activatedRoute.snapshot.children[0].params);

                //this.routeOkEvent.emit(this.activatedRoute.snapshot.children[0].params);

            } else {

                this.activatedRoute.params.subscribe(params => {
                    AppSettings.OrganisationCode = this.organisationCode = params['storeId'];

                    if (AppSettings.OrganisationCode &&
                        AppSettings.OrganisationCode.length > 0) {
                        this.emitRouteOk(params);
                    }
                });
            }
        }


    }

    inititalize() {

    }

    setUrl() {
        if (window) {
            this.url = window.location.href;
        }
    }

    private emitRouteOk(params: any) {
        if (this.api.storeId) {
            this.api.genericRead('organisation')
                .subscribe(o => {

                    AppSettings.OrganisationSet(o);

//                    AppSettings.Organisation = o;
                    this.storeId = AppSettings.Organisation.Code;
                    this.routeOkEvent.emit(params);
                },
                error => {
                    console.log(error);
                });
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(s => {
                s.unsubscribe();
            });
        }
    }

}
