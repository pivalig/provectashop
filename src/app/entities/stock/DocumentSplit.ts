import { GenericEntity, GenericPredicate } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Organisation } from '../framework/security/Organisation';
import { PredicateArray } from '../base/PredicateArray';

export enum SplitDocumentType {
    None,
    Shift,
    Inventory,
    Bill
}

export class DocumentSplit extends GenericEntity {
    Organisation?: Organisation;
    SplitDocumentType?: SplitDocumentType;
    IsSystem?: boolean;
    IsExclusive?: boolean;
    Settings: Array<KeyValue> = undefined;

    constructor() {
        super();
    }
}

export class DocumentSplitPredicate extends GenericPredicate {
    SplitDocumentTypes: PredicateArray<SplitDocumentType> = new PredicateArray<SplitDocumentType>();
}