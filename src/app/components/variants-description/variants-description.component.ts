import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { CartService } from "../../shared/cart.service";
import { Document } from "../../entities/stock/Document";
import { ApiAccessService } from "../../shared/apiAccess.service";
import { Article, SplitActionType } from "../../entities/index";
import { ArticleGroup } from "../../entities/stock/ArticleGroup";

@Component({
    selector: 'variants-description',
    styleUrls: ['variants-description.component.scss'],
    template: `<span *ngFor="let group of groups; let last = last">
    {{group.ArticleSplit?.Names | datatranslate: group.ArticleSplit?.Name}}: 
    <span class="value">{{group.Names | datatranslate: group.Name}}</span><span *ngIf="!last">,</span> </span>`,

})
export class VariantsDescriptionComponent {
    @Input()
    product: Article;
    groups: Array<ArticleGroup>;

    constructor() {

    }

    ngOnChanges() {

        if (this.product) {
            this.groups =
                this.product.ArticleGroups.filter(g =>!(
                    g.ArticleSplit.SplitActionType != undefined &&
                    g.ArticleSplit.SplitActionType != SplitActionType.None &&
                    g.ArticleSplit.SplitActionType != SplitActionType.Size &&
                    g.ArticleSplit.SplitActionType != SplitActionType.Color));


        }
    }


}