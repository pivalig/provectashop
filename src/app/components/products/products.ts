import {
    Inject, ViewChild, ElementRef,
    Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, Output,
    EventEmitter, ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { ArticleGroup, ArticleSplit, Article, GenericOutput } from '../../entities/index';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as $ from 'jquery';

@Component({
    selector: 'products',
    templateUrl: './products.html',
    styleUrls: ['./products.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnChanges {

    @Input()
    storeId: string;
    @Input()
    isClient: boolean;
    @Input()
    activatedRoute: ActivatedRoute;

    priceRange: Array<number>;
    filters: Array<{ split: ArticleSplit, groups: Array<ArticleGroup> }>;
    queryFilters: Array<string> = [];
    searchResult: GenericOutput<Article>;
    isLoading: boolean;
    currentPage = 0;
    sort: string = 'newest';

    priceRangeConfig: any;
    priceTimer: any;

    @Output('onLoaded')
    loaded: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('productshost')
    productshost: ElementRef;

    topOffset: any = 400;
    isFiltersExists: boolean;

    constructor(
        private apiAccessService: ApiAccessService,
        private location: Location,
        public dialog: MatDialog) {


    }

    openFiltersDialog(): void {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog,
            {
                width: '100%',
                data: this
            });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.onFilterChange(result);
            }
        });
    }


    ngOnChanges(): void {
        if (this.activatedRoute) {
            this.activatedRoute.queryParams.subscribe(params => {

                this.sort = params['sort'] || 'newest';
                let filters = params['filters'];
                this.currentPage = params['Page'] * 1 || 0;


                let rangeFrom = params['From'];
                let rangeTo = params['To'];

                if (rangeFrom > 0 && rangeTo > 0) {
                    this.priceRange = [rangeFrom, rangeTo];
                }

                if (filters && !(filters instanceof Array) && filters.length) {
                    this.queryFilters = [filters];
                } else {
                    this.queryFilters = filters;
                }

                this.getProducts();
            });

        } else {

            this.getProducts();
        }

        if (this.productshost) {
            this.topOffset = this.productshost.nativeElement.clientTop;

        }


    }


    prepareFilters(groups: Array<ArticleGroup>) {

        if (!this.filters) {
            this.filters = [];
        }

        if (!groups) {
            return;
        }

        groups.forEach(g => {
            const filter = this.filters.find(x => x.split.Id === g.ArticleSplit.Id);

            if (this.queryFilters && this.queryFilters.length) {
                g['checked'] = this.queryFilters.findIndex(x => x === g.Id) >= 0;
            }

            if (filter) {

                if (filter.groups.findIndex(x => x.Id === g.Id) < 0) {
                    filter.groups.push(g);
                }
            } else {
                this.filters.push({
                    split: g.ArticleSplit,
                    groups: [g]
                });
            }


        });

        this.queryFilters = undefined;
    }

    getFilters() {
        this.getPriceRange();

        this.apiAccessService.genericSearch<GenericOutput<ArticleGroup>>('group')
            .subscribe(r => {
                this.prepareFilters(r.Entities);
            },
            error => {
                console.error(error);
            });
    }

    getPriceRange() {
        this.apiAccessService.genericSearch<Array<number>>('product', null, '/price/range')
            .subscribe(r => {

                if (r) {
                    if (!this.priceRange) {
                        this.priceRange = r;
                    }
                    this.priceRangeConfig = {
                        behaviour: 'drag',
                        animate: true,
                        animationDuration: 300,
                        connect: true,
                        step: 10,
                        range: {
                            min: r[0],
                            max: r[1]
                        }
                    };
                }
            },
            error => {
                console.error(error);
            });
    }

    onPriceRangeChange(event) {

        if (this.priceTimer) {
            clearTimeout(this.priceTimer);
        }

        this.priceTimer = setTimeout(() => {
            if (this.currentPage !== 0) {
                this.currentPage = 0;
            } else {
                this.getProducts();
            }
        },
            600);
    }

    //get isFiltersExists boolean {
    //    return this.filters &&
    //        this.filters.length &&
    //      this.filters.reduce((a, b) => {


    //      if (b.groups && b.groups.length) {
    //        return a + (b.groups.filter(g=>g['checked']).length || 0);

    //      } else {
    //          return a;
    //      }},0) >0;

    //}

    clearFilters() {
        if (this.filters) {
            this.filters.forEach(x => {
                x.groups.forEach(g => {
                    g['checked'] = false;
                });
            });

            this.onFilterChange(null);
        }

    }

    onFilterChange(event) {
        this.isLoading = !!event;
        this.currentPage = 0;
        this.getProducts();
    };

    getProducts(event?: any) {



        this.isLoading = true;

        let predicate = '';

        let page = this.currentPage;

        if (event && event.pageIndex >= 0) {
            this.currentPage = event.pageIndex;
            page = event.pageIndex;
        }


        predicate = 'Size=12&Page=' + page;

        if (this.priceRange && this.priceRange.length) {
            if (predicate.length > 0) {
                predicate += '&';
            }

            predicate += `From=${this.priceRange[0]}&To=${this.priceRange[1]}`;
        }


        if (this.sort && this.sort.length) {
            if (predicate.length > 0) {
                predicate += '&';
            }
            predicate += 'sort=' + this.sort;
        }

        if (this.queryFilters && this.queryFilters.length) {
            this.queryFilters.forEach(g => {
                if (predicate.length > 0) {
                    predicate += '&';
                }
                predicate += "filters=" + g;
            });
        } else if (this.filters) {
            this.filters.forEach(x => {
                x.groups.forEach(g => {
                    if (g['checked']) {
                        if (predicate.length > 0) {
                            predicate += '&';
                        }
                        predicate += "filters=" + g.Id;
                    }
                });
            });
        }

        this.isFiltersExists = predicate.indexOf('filters=') >= 0;

        this.apiAccessService.genericSearch<GenericOutput<Article>>('product', predicate)
            .subscribe(r => {

                this.searchResult = r;
                this.isLoading = false;
                if (this.isClient && predicate && predicate.length) {
                    this.location.go(`/${this.storeId}?${predicate}`);
                }



                this.loaded.emit(true);

                if (!this.filters) {
                    this.getFilters();
                }


                if (this.isClient && event && event.pageIndex) {
                    $("html, body").animate({ scrollTop: 600 }, "1000");
                }

            },
            error => {
                this.searchResult = null;
                this.isLoading = false;
                console.error(error);
                this.loaded.emit(false);

                if (!this.filters) {
                    this.getFilters();
                }

            });
    }


}

@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
<h1 mat-dialog-title>{{'Filters'|translate}}</h1>
<div mat-dialog-content >
        <button *ngIf="model?.isFiltersExists && model?.filters?.length" mat-button (click)="model.clearFilters()">{{'Clear all'|translate}}</button>
  
<mat-expansion-panel [expanded]="true" *ngFor="let filter of model?.filters" class="noselect">
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                {{filter.split.Names | datatranslate: filter.split.Name}}
                            </mat-panel-title>

                        </mat-expansion-panel-header>


                        <mat-list-item *ngFor="let group of filter.groups">
                            <mat-checkbox [(ngModel)]="group.checked" class="noselect">{{group.Names | datatranslate: group.Name}}</mat-checkbox>
                        </mat-list-item>
                    </mat-expansion-panel>
                    <div *ngIf="model?.priceRangeConfig" class="padding-top">
                        <div class="col-xs-6">
                            <span *ngIf="model?.priceRange">
                                {{model.priceRange[0] | number:'1.2-2'}}
                            </span>

                        </div>
                        <div class="col-xs-6 text-right">
                            <span *ngIf="model?.priceRange">
                                {{model.priceRange[1] | number:'1.2-2'}}
                            </span>
                        </div>
                        <div class="col-xs-12">
                            <nouislider [config]="model?.priceRangeConfig"
[(ngModel)]="model.priceRange"></nouislider>
                        </div>
                    </div>
</div>
<div mat-dialog-actions>
  <button mat-button [mat-dialog-close]="true" tabindex="2">{{'Apply'|translate}}</button>
  <button mat-button (click)="onNoClick()" tabindex="-1">{{'Cancel'|translate}}</button>
</div>
`
})
export class DialogOverviewExampleDialog {

    model: any;
    //    loaded: boolean;

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.model = data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    //    ngOnInit() {
    //        setTimeout(() => {
    //                this.loaded = true;
    //            },
    //            100)
    //
    //    }
}
