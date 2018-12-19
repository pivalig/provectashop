import {GenericEntity} from '../../../entities/base/GenericEntity';

export class User extends GenericEntity {
    Password: string = undefined;
    FacebookId: string = undefined;
    GmailId: string = undefined;
    CreatedOn: Date = undefined;
    LockedOn: Date = undefined;

    constructor() {
        super();
    }
}
