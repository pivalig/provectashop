import { Component } from "@angular/core";
import { Document } from "../../entities/stock/Document";
import { ApiAccessService } from "../../shared/apiAccess.service";
import { GenericOutput } from "../../entities/index";
import { UserService } from "../../shared/user.service";
import { CommonHelper } from "../../helpers/CommonHelper";

@Component({
    selector: 'orders',
    styleUrls: ['./orders.scss'],
    templateUrl: './orders.html'

})
export class OrdersComponent {
    orders: Array<Document>;
    currentPage: number = 0;
    searchResult: GenericOutput<Document>;
    isLoading: boolean;

    constructor(private api: ApiAccessService, private userService: UserService) {

    }

    ngOnInit() {

        this.getOrders();
        // this.subscription = this.cartServce.cartChanged.subscribe((cart: Document) => {
        //     this.bindCart(cart);
        // })

        // this.bindCart(this.cartServce.getCart());

    }

    ngOnDestroy() {
        // if (this.subscription) {
        //     this.subscription.unsubscribe();
        // }
    }

    getOrders(event?: any) {

        let person = this.userService.getUser();

        if (!person) {
            return;
        }

        this.isLoading = true;

        let predicate = '';

        let page = this.currentPage;

        if (event && event.pageIndex >= 0) {
            this.currentPage = event.pageIndex;
            page = event.pageIndex;
        }
        predicate = `Size=10&Page=${page}`;


        this.api.genericSearch<GenericOutput<Document>>('account', predicate, 'orders')
            .subscribe(r => {


                if(!this.orders){
                    this.orders = [];
                }

                this.orders = this.orders.concat(r.Entities);
                this.searchResult = r;
                this.isLoading = false;
            },
            error => {
                this.searchResult = null;
                this.isLoading = false;
                console.error(error);
            });
    }

    loadMore({ }) {
        this.getOrders({ pageIndex: this.currentPage + 1 });
    }

    canLoadMore(): boolean {
        if (this.searchResult) {
            return CommonHelper.canLoadMore(this.searchResult.Pager);
        } else {
            return false;
        }
    }
}