import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContainerBase } from "../ContainerBase";
import { Article, GenericOutput, ArticleGroup, ArticleSplit, SplitActionType, Organisation } from '../../entities/index';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { SeoService } from '../../shared/seo.service';
import { CommonHelper } from '../../helpers/CommonHelper';
import * as $ from 'jquery';
import { AppSettings } from '../../shared/AppSettings';
import { MatTableDataSource } from '@angular/material';
import { CartService } from '../../shared/cart.service';
import { Filestream } from '../../entities/framework/common/Filestream';

@Component({
    selector: 'product-details',
    styleUrls: ['./product-details.component.scss'],
    templateUrl: './product-details.component.html'

})
export class ProductDetailsComponent extends ContainerBase {

    product: Article;
    productCode: string;
    isLoading: boolean = true;
    isVariantsLoading: boolean;
    groups: Array<ArticleGroup> = [];
    splits: Array<ArticleGroup> = [];
    variants: Array<Article> = [];
    url: string;
    dataSource: MatTableDataSource<ArticleGroup>;
    displayedColumns = ['ArticleSplit', 'ArticleGroup'];
    filestreams: Array<Filestream>;
    organisation: Organisation;

    constructor(
        private seoService: SeoService,
        @Inject(PLATFORM_ID) public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public translate: TranslateService,
        private cartService: CartService,
        public api: ApiAccessService) {

        super(platformId, activatedRoute, api);

        this.subscriptions.push(this.routeOkEvent.subscribe(params => {

            this.productCode = params.productCode;
            this.getProduct();
        }, error => {
            console.error(error);
        }));
    }

    setMeta() {

        if (this.product) {

            try {

                this.seoService.setTitle(CommonHelper.getDataSense(this.product.Names, this.product.Name));

                this.seoService.setDescription(CommonHelper
                    .getDataSense(this.product.Descriptions, this.product.Description));


                if (this.filestreams) {
                    let defaultImage = this.filestreams.find(x => x.IsDefault) || this.product.Filestream;
                    if (!defaultImage && this.filestreams.length > 0) {
                        defaultImage = this.filestreams[0];
                    }
                    if (defaultImage) {
                        this.seoService.setMeta("og:image", CommonHelper.getImageSrc(defaultImage));
                    }
                }



                this.seoService.setMetaName("twitter:card", "product");
                this.seoService.setMetaName("twitter:data1", this.product.Price.toFixed(2));

                this.seoService.setMeta("og:type", "product");
                this.seoService.setMeta("product:price", this.product.Price.toFixed(2));

                if (AppSettings.Organisation) {

                    let currency = CommonHelper.getSettingValueByKey(AppSettings.Organisation, 'currency');
                    if (currency) {
                        this.seoService.setMeta("product:price:currency", currency);
                    }

                }

                // this.seoService.setMeta("product:price:currency", 'MDL');
                // this.seoService.setMeta("og:price:amount", this.product.Price.toFixed(2));
            } catch (e) {
                console.log(e);
            }

        }
    }

    getVariants() {
        if (this.isClient && this.product) {
            this.isVariantsLoading = true;
            this.api.genericRead<Array<Article>>('product', `${this.productCode}/variants`)
                .subscribe((r: Array<Article>) => {
                    this.isVariantsLoading = false;
                    this.variants = r;

                    if (this.variants) {
                        let splits = [];
                        if (!this.filestreams) {
                            this.filestreams = this.product.Filestreams || [];
                        }

                        this.variants.forEach(p => {

                            if (p.Filestreams) {
                                this.filestreams = this.filestreams.concat(p.Filestreams);
                            }

                            p.ArticleGroups.forEach(g => {
                                if (g.ArticleSplit.SplitActionType != undefined &&
                                    g.ArticleSplit.SplitActionType != SplitActionType.None &&
                                    g.ArticleSplit.SplitActionType != SplitActionType.Size &&
                                    g.ArticleSplit.SplitActionType != SplitActionType.Color) {
                                    return;
                                }

                                let split = splits.findIndex(x => x.Id == g.ArticleSplit.Id);
                                if (split < 0) {
                                    g.ArticleSplit['groups'] =  <Array<Article>>JSON.parse(JSON.stringify(this.getGroupsBySplit(g.ArticleSplit) || []));
                                    splits.push(g.ArticleSplit);
                                }
                            })

                        })


                        this.splits = CommonHelper.orderBy(splits, 'Name');
                        this.product.Filestreams = this.filestreams;

                    }
                }, error => {
                    console.error(error);
                    this.isVariantsLoading = false;

                });
        }
    }

    getGroupsBySplit(split: ArticleSplit): Array<ArticleGroup> {
        if (!split) {
            return [];
        }

        var splitGroups = [];

        this.variants.forEach(p => {
            p.ArticleGroups.filter(x => x.ArticleSplit.Id == split.Id).forEach(g => {

                let grp = splitGroups.find(y => y.Id == g.Id);
                if (!grp) {
                    splitGroups.push(g)
                }

            })
        })

        return splitGroups;

    }

    getProduct() {
        this.isLoading = true;


        this.api.genericRead<Article>('product', this.productCode)
            .subscribe((r: Article) => {
                this.product = r;

                this.isLoading = false;

                if (!this.product) {

                } else {
                    if (this.product.ArticleGroups) {
                        this.product.ArticleGroups.forEach(g => {
                            if (g.ArticleSplit &&
                                (g.ArticleSplit.SplitActionType == undefined ||
                                    g.ArticleSplit.SplitActionType == SplitActionType.None)) {
                                this.groups.push(g);
                            }
                        });

                        this.dataSource = new MatTableDataSource(this.groups);
                    }

                    this.filestreams = this.product.Filestreams || [];

                    this.setMeta();


                    if (this.isClient) {
                        $("html, body").animate({ scrollTop: 0 }, "fast");
                        this.getVariants();
                    }

                }

            }, error => {
                console.error(error);
                this.isLoading = false;

            });

    }

    get canAddToCart(): boolean {
        let result = this.isClient && this.product != undefined
            && !this.isVariantsLoading;



        if (this.splits) {
            this.splits.forEach(split => {
                if (result && !split['selected']) {
                    result = false;
                }

            });
        }
        return result;
    }

    getFinalProduct(): Article {

        var result;
        if (this.variants && this.variants.length) {
            this.variants.forEach(variant => {

                if (result != null) {
                    return;
                }

                result = variant;

                this.splits.forEach(split => {

                    let group = split['selected'] as ArticleGroup;
                    if (group) {
                        var existsIndex = variant.ArticleGroups.findIndex(x => x.Id == group.Id);
                        if (existsIndex < 0) {
                            result = null;
                            return;
                        }
                    }
                });


            });

            if (result) {
                result.Name = this.product.Name;
                result.ParentCode = this.product.Code;

                if (!result.Filestream) {
                    result.Filestreams = this.product.Filestreams;
                    if (result.Filestreams && result.Filestreams.length) {
                        result.Filestream = result.Filestreams[0];
                    }
                }
            }
        }
        else {
            result = this.product;
        }

        return result;
    }

    addToCart() {

        let product = this.getFinalProduct();


        if (product) {

            // product.ArticleGroups.forEach(group => {
            //     group.ArticleSplit['groups'] =
            //     group.ArticleSplit['selected'] = undefined;
            // });

            this.cartService.addProduct(product);
        }


    }
}
