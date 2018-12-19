import { Injectable, Output, EventEmitter, Inject } from "@angular/core";
import { Article, Document, ArticleMeasureType, Lot } from "../entities/index";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from '@angular/core';
import { DocumentOperationType, DocumentActionType } from "../entities/stock/Document";
import { ApiAccessService } from "./apiAccess.service";
import { AppSettings } from "./AppSettings";


@Injectable()
export class CartService {
    private cart: Document;
    @Output() cartChanged: EventEmitter<Document> = new EventEmitter<Document>();


    constructor(
        private api: ApiAccessService,
        @Inject(PLATFORM_ID) private platformId: Object) {


    }

    getCart() {

        // if (!this.cart) {

        if (isPlatformBrowser(this.platformId)) {
            if (this.api.storeId) {
                let cart = localStorage.getItem(`${this.api.storeId}_cart`);
                if (cart && cart.length) {

                    this.cart = new Document(JSON.parse(cart));
                    this.cartChanged.emit(this.cart);

                }else if(this.cart){
                    this.cart = undefined;
                    this.cartChanged.emit(this.cart);
                }

               
            }
        }
        // }
        return this.cart;
    }

    clearCart(): any {
        this.cart = undefined;
        this.dumpData();
        this.cartChanged.emit(undefined);
    }

    addProduct(product: Article, quantity?: number) {

        if (!product) {
            return;
        }

        if (!this.cart) {
            this.getCart();
        }

        if (!this.cart) {

            this.cart = new Document();
            this.cart.Organisation = AppSettings.Organisation;
            this.cart.DocumentOperationType = DocumentOperationType.OrderOnline;
            this.cart.DocumentActionType = DocumentActionType.Order;
            this.cart.Lots = []
        }

        if (!quantity) {
            quantity = 1;
        }

        let lot: Lot;
        lot = new Lot();
        lot.Article = product;
        lot.Quantity = quantity * 1;
        lot.PrimaryDebitPrice = lot.DebitPrice = product.Price || 0;
        lot.CreditPrice = 0;

        let lotIndex = this.cart.Lots.findIndex(x => x.Article.Id == product.Id);

        if (lotIndex >= 0) {

            lot = this.cart.Lots[lotIndex];
            lot.Quantity = lot.Quantity * 1 + quantity;
        } else {

            this.cart.Lots.push(lot);
        }

        this.infoCartChanged();
    }

    removeLot(lot: Lot) {
        this.cart.Lots.splice(this.cart.Lots.indexOf(lot), 1);
        this.infoCartChanged();
    }
    
    updateLot(lot: Lot) {
        this.cart.Lots[this.cart.Lots.indexOf(lot)] = lot;
        this.infoCartChanged();
    }

    private infoCartChanged() {
        this.cartChanged.emit(this.cart);
        this.dumpData();
    }

    private dumpData() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.api.storeId) {
                let cart = localStorage.getItem(`${this.api.storeId}_cart`);
                if (!this.cart) {
                    localStorage.removeItem(`${this.api.storeId}_cart`);
                } else {
                    localStorage.setItem(`${this.api.storeId}_cart`, JSON.stringify(this.cart));
                }
            }
        }
    }


}

