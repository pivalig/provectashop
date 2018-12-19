import { OnInit, Directive, ElementRef, Input, NgZone } from '@angular/core';

@Directive({
    selector: '[show-image]'
})
export class ShowImage {

    @Input() url: string;
    @Input() asBackground: boolean;

    private image: any;
    private isLoaded: boolean;

    constructor(private el: ElementRef) {
    }

    applyUrl(url) {
        if (this.asBackground) {
            this.el.nativeElement.style.backgroundImage = 'url(' + (url || this.url) + ')';
            this.el.nativeElement.style.backgroundSize = 'cover';
            this.el.nativeElement.style.backgroundPosition = 'center';
            this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
            this.el.nativeElement.style.width = '100%';
            this.el.nativeElement.style.height = '100%';

        } else {

            // this.ngZone.run(() => {

            // while (this.el.nativeElement.firstChild) {
            //     this.el.nativeElement.removeChild(this.el.nativeElement.firstChild);
            // }
            this.el.nativeElement.appendChild(this.image)
            // })

        }
    }

    imageReady(v: ShowImage) {
        this.isLoaded = true;

        v.applyUrl(v.url);
    };

    ngOnChanges(changes: any) {


        if (!this.url) {
            return;
        }

        this.image = new Image();
        this.image.onload = (() => this.imageReady(this));
        this.image.src = this.url;
    }
}
