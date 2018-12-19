import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../entities/index';
import { Organisation } from '../../entities/framework/security/Organisation';
import { AppSettings } from '../../shared/AppSettings';

@Component({
    selector: 'product',
    templateUrl: './product.html',
    styleUrls: ['./product.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    @Input() product: Article;
    @Input() storeId: string;

    organisation:Organisation;

    constructor() {

    }

    get productLink(): string {
        return `/${this.storeId}/product-details/${this.product.Code}`;
    }

    ngOnInit() {
        this.organisation = AppSettings.Organisation;
    }

    ngOnDestroy(): void {
        
    }
}
