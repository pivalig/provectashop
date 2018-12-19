import {
    Inject, Component, OnInit, OnChanges, OnDestroy,
    Input, Output, ViewEncapsulation, EventEmitter, AfterViewInit,
    AfterViewChecked
} from '@angular/core';
import { Filestream, Post } from '../../entities/index';
import * as $ from 'jquery';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AppSettings } from '../../shared/AppSettings';

@Component({
    selector: 'slider',
    templateUrl: './slider.html',
    styleUrls: ['./slider.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnDestroy, OnChanges {

    @Input()
    sliderId: number;
    swiper: any;
    @Input() slides: Array<Filestream>;
    @Input() posts: Array<Post>;
    @Input() asBackground: boolean;
    @Input() effect: string;

    config: SwiperConfigInterface;

    constructor() {

        //this.slides =  [{}]


    }

     getPostLink(post:Post): string {
        return `/${AppSettings.OrganisationCode}/blog-details/${post.Code}`;
    }

    ngOnChanges(changes: any) {

        if (!this.sliderId) {
            this.sliderId = new Date().valueOf();
        }

        if (this.slides) {
            this.posts = [];

            this.slides.forEach(f => {
                this.posts.push({
                    Filestream: f
                });
            });
        }


        if (!this.posts || !this.posts.length) {
            return;
        }

        this.config =
            {
                pagination: this.posts.length > 1,
                navigation: this.posts.length > 1,
                effect: this.effect 
            }

        // $('#' + this.sliderId).ready(() => {

        //     setTimeout(() => {

        //         this.swiper = new window['Swiper']('#' + this.sliderId,
        //             {
        //                 init: true,
        //                 navigation: {
        //                     nextEl: '.swiper-button-next',
        //                     prevEl: '.swiper-button-prev',
        //                 },
        //                 pagination: {
        //                     el: '.swiper-pagination',
        //                     dynamicBullets: true,
        //                     spaceBetween: 30,
        //                     slidesPerView: 1,
        //                     //                            centeredSlides: true
        //                 }


        //             });

        //     }, 100);

        // });

    }

    ngOnDestroy() {
    }

    ngAfterViewChecked() {

        if (this.swiper && (!this.swiper.width || !this.swiper.height)) {
            //console.log('swiper.update');
            this.swiper.update();
        }
    }
}
