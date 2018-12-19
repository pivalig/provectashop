import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ContainerBase } from "../ContainerBase";
import { Article, GenericOutput, ArticleGroup, ArticleSplit, SplitActionType, Lot } from '../../entities/index';
import { ApiAccessService } from '../../shared/apiAccess.service';
import { SeoService } from '../../shared/seo.service';
import { CommonHelper } from '../../helpers/CommonHelper';
// import * as $ from 'jquery';
import { AppSettings } from '../../shared/AppSettings';
import { MatTableDataSource } from '@angular/material';
import { CartService } from '../../shared/cart.service';
import { Document } from '../../entities/stock/Document';
import { Location } from '@angular/common';
import { Person } from '../../entities/framework/owner/Person';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'shopping-cart',
    styleUrls: ['./shopping-cart.component.scss'],
    templateUrl: './shopping-cart.component.html'

})
export class ShoppingCartComponent extends ContainerBase {

    cart: Document;
    dataSource: MatTableDataSource<Lot>;
    displayedColumns = ['product', 'price', 'quantiy', 'total'];
    step: number = 0;
    person: Person = new Person();
    @ViewChild('personForm') personForm: any;
    documentSaving: boolean;
    address: string;

    constructor(
        private seoService: SeoService,
        @Inject(PLATFORM_ID) public platformId: Object,
        public activatedRoute: ActivatedRoute,
        public translate: TranslateService,
        private location: Location,
        private router: Router,
        private cartService: CartService,
        private userService: UserService,
        public api: ApiAccessService) {

        super(platformId, activatedRoute, api);


        this.subscriptions.push(this.routeOkEvent.subscribe(params => {
            this.bindCart();
            this.bindUser(this.userService.getUser() || new Person());
        }, error => {
            console.error(error);
        }));


        this.subscriptions.push(this.userService.userChanged.subscribe(user => {
            this.bindUser(user);
        }));

        this.subscriptions.push(this.router.events.subscribe((event) => {
            this.bindCart();
        }))
    }

    bindUser(person: Person) {
        this.person = person;

        if (person) {
            this.address = CommonHelper.getSettingValueByKey(person, 'address');
        }
    }

    bindCart() {
        this.cart = this.cartService.getCart();
        if (this.cart) {
            this.dataSource = new MatTableDataSource(this.cart.Lots);
        }
    }

    changeLotQty(lot: Lot, add?: boolean) {
        if (add) {
            lot.Quantity++;
        } else {
            lot.Quantity--;
        }
        this.cartService.updateLot(lot);

    }

    removeLot(lot: Lot) {
        this.cartService.removeLot(lot);
        this.cart = this.cartService.getCart();

    }

    goBack() {
        if (!this.step) {
            this.location.back();
        } else {
            this.step--;
        }
    }

    getProductLink(product: Article): string {
        return `/${this.api.storeId}/product-details/${product['ParentCode'] || product.Code}`;
    }


    get canGoNext(): boolean {
        let result = false;

        if (!this.step && this.cart) {
            result = this.cart.getTotalCount() > 0;
        }

        if (this.step == 1) {
            result = this.personForm.form.valid
        }

        return result;
    }

    goNext() {
        if (this.step == 1) {
            if (!this.personForm.form.valid) {
                return;
            }
            this.createOrder();
            return;
        }
        if (this.step == 2) {
            this.location.go('/');
            return;
        }
        this.step++;
    }

    createOrder() {
        let document = this.cart;
        document.Person = this.person;
        if (this.address) {
            CommonHelper.setSettingsValue(document, { Key: 'address', Value: this.address });
        }
        //document.Organisation = AppSettings.Organisation;

        this.documentSaving = true;
        this.api.genericPost<Document>('document', document, true)
            .subscribe(doc => {
                this.documentSaving = false;
                this.step++;
                this.userService.updateUser(doc.Person);
                this.cartService.clearCart();
            }, err => {
                console.error(err);
                this.documentSaving = false;
            })
    }

}
