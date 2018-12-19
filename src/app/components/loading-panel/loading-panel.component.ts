import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { CartService } from "../../shared/cart.service";
import { Document } from "../../entities/stock/Document";
import { ApiAccessService } from "../../shared/apiAccess.service";

@Component({
    selector: 'loading-panel',
    template: `<div class="example-loading-shade" *ngIf="loading">
    <mat-spinner [diameter]="75" ></mat-spinner>
  </div>`,
  styles:[`.example-loading-shade {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.04);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }`]

})
export class LoadingPanelComponent {
    @Input() loading: boolean;

    constructor() {

    }


}