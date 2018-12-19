import { Emplacement } from "./Emplacement";
import { GenericEntity } from '../../../entities/base/GenericEntity';
import { KeyValue } from '../../../entities/framework/common/KeyValue';
import { PredicateArray } from '../../../entities/base/PredicateArray';

export class OrganisationPredicate {
    Organisations?: PredicateArray<Organisation> = new PredicateArray<Organisation>();
    Codes?: PredicateArray<string> = new PredicateArray<string>();
    IDNOs?: PredicateArray<string> = new PredicateArray<string>();
}

export interface IOrganisation {
}

export class Organisation extends GenericEntity implements IOrganisation {
    CreatedOn?: Date = undefined;
    Emplacement?: Emplacement = undefined;
    Settings?: Array<KeyValue> = undefined;
    Filestream?: any;

    constructor() {
        super();
    }
}