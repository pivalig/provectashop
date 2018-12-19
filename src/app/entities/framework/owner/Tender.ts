import { Organisation, OrganisationPredicate } from '../security/Organisation';
import { Criteria, GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { PredicateArray } from '../../base/PredicateArray';
import { Branch, BranchPredicate } from './Branch';
import { Device } from '../common/Device';

export enum TenderActionType {
    Undefined = 0,
    Cash = 1,
    Card = 2,
    Voucher = 3
}


export class TenderPredicate extends GenericPredicate {
    Tenders?: PredicateArray<Tender>;
    TenderActionTypes: Criteria<Array<TenderActionType>>;
}

export class Tender extends GenericEntity {

    TenderActionType?: TenderActionType;
    Description?: string;
    Settings?: Array<KeyValue> = undefined;

    constructor() {
        super();
    }
}
