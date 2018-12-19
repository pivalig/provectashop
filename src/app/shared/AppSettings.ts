import { Organisation } from '../entities/index';
import { EventEmitter } from '@angular/core';

export class AppSettings {

    public static currentLang: string;
    public static AccessToken: string;
    public static Organisation: Organisation;
    public static OrganisationCode: string;

    public static get Debug(): boolean { return false; }

    public static OrganisationChanged: EventEmitter<Organisation> = new EventEmitter<Organisation>();

    public static OrganisationSet(org: Organisation) {

        if (org) {
            this.Organisation = org;
            this.OrganisationCode = org.Code;
            this.OrganisationChanged.emit(org);
        }

    };

    public static get FilestreamEndpoint(): string {
        return 'https://provectapos.com/filestreams/';
    }

    public static get API_DEBUG_ENDPOINT(): string { return 'http://localhost:50738' }

    public static get API_ENDPOINT(): string { return this.HOST + '/api/'; }

    public static get HOST(): string { return (this.Debug ? this.API_DEBUG_ENDPOINT : 'https://provectapos.com/api'); }

}
