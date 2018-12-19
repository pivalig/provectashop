import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { CartService } from "../../shared/cart.service";
import { Document } from "../../entities/stock/Document";
import { ApiAccessService } from "../../shared/apiAccess.service";
import { Router, ActivationEnd } from "@angular/router";
import { AppSettings } from "../../shared/AppSettings";

@Component({
    selector: 'cart-button',
    styleUrls: ['cartbutton.component.scss'],
    template: `<button  [routerLink]="getLink('cart')" *ngIf="count && apiAccessService.storeId" mat-icon-button>
    <span class="count mat-elevation-z4">{{count}}</span>
    <mat-icon>shopping_cart</mat-icon>
  </button>`,

})
export class CartButtonComponent {
    subscriptions: Array<Subscription> = [];
    count: number;

    constructor(public cartServce: CartService,
        private router: Router,
        public apiAccessService: ApiAccessService) {

    }

    ngOnInit() {

        this.subscriptions.push(this.cartServce.cartChanged.subscribe((cart: Document) => {
            this.bindCart(cart);
        }))

        this.subscriptions.push(
        
            // this.router.events
            //     .subscribe((event) => {

            //         if (event instanceof ActivationEnd) {
            //             setTimeout(() => {

            //                 this.bindCart(this.cartServce.getCart());
            //             }, 200);
            //         }
            //     })
            
                AppSettings.OrganisationChanged.subscribe(org=>{
                    this.bindCart(this.cartServce.getCart());
                  })
         
            )

        this.bindCart(this.cartServce.getCart());

    }

    bindCart(cart: Document) {
        if (cart) {
            this.count = cart.getTotalCount();
        } else {
            this.count = 0;
        }
    }
    ngOnDestroy() {
        if (this.subscriptions) {

            this.subscriptions.forEach(subscription => {
                subscription.unsubscribe();

            });
        }
    }

    getLink(path: string): string {
        if (this.apiAccessService.storeId) {
            return `${this.apiAccessService.storeId}/${path}`;
        } else {
            return '';
        }
    }
}