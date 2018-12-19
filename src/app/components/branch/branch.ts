import { Component, Input, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { Branch } from '../../entities/index';

@Component({
    selector: 'branch',
    templateUrl: './branch.html',
    styleUrls: ['./branch.scss']

})

export class BranchComponent implements OnInit, OnDestroy {

    @Input() branch: Branch;
    @Input() storeId: string;
    constructor() {

    }

    get branchLink(): string {
        return `/${this.storeId}/branch-details/${this.branch.Code}`;
    }

    ngOnInit() {
       // console.log('branch',this.branch);
    }

    ngOnDestroy(): void {
        
    }
}
