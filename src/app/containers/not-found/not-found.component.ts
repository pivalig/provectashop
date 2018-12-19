import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'not-found',
    styleUrls: ['./not-found.component.scss'],
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
    constructor(
        private httpClient: HttpClient
        , @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
        
            this.getGeoCodeData('Chisinau TRaian 9');
        }
    }

    getGeoCodeData(query: string) {

//         this.httpClient
//             .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyCnIqYzbTFgev0cF-f6kRjypni7-UYoyaY`)
//             .subscribe(res => {
// debugger;
//             })

    }
}
