import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post, DateTimeOffset } from '../../entities/index';

@Component({
    selector: 'blog',
    templateUrl: './blog.html',
    styleUrls: ['./blog.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

    @Input() blog: Post;
    @Input() storeId: string;
    constructor() {

    }

    get blogLink(): string {
        return `/${this.storeId}/blog-details/${this.blog.Code}`;
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
