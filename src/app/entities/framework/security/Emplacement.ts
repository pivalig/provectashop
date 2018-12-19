import {GenericEntity} from '../../../entities/base/GenericEntity';

export class Emplacement extends GenericEntity {
    Description: string = undefined;
    
    constructor() {
        super();
    }
}