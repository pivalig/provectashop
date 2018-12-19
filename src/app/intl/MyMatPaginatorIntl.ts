import { Subject } from "rxjs/Subject";
import { TranslateService } from '@ngx-translate/core';



export class MyMatPaginatorIntl {



    itemsPerPageLabel = 'Items per page:';
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';
    of = 'of';
    changes: Subject<void> = new Subject();
    subscription: any;


    constructor(public translate: TranslateService) {


    }

    bindText(riseChange: boolean) {
        this.translate.get(['itemsPerPageLabel', 'nextPageLabel', 'previousPageLabel', 'of'])
            .subscribe(res => {
                this.itemsPerPageLabel = res['itemsPerPageLabel'];
                this.nextPageLabel = res['nextPageLabel'];
                this.previousPageLabel = res['previousPageLabel'];
                this.of = res['of'];
                if (riseChange) {
                    this.changes.next();
                }
            })

    }
    getRangeLabel(page: number, pageSize: number, length: number): string {




        if (length == 0 || pageSize == 0) {
            return `0 ${this.of} ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;


        if (!this.subscription) {
            this.subscription = this.translate.onLangChange.subscribe(lang => {
                this.bindText(true);
            })
            setTimeout(() => {
                this.bindText(true);
            }, 200);
        }
        return `${startIndex + 1} - ${endIndex} ${this.of} ${length}`;


    }
}