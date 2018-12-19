import { Criteria, GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { Branch, BranchPredicate } from './Branch';
import { KeyValue } from '../common/KeyValue';
import { PredicateArray } from '../../base/PredicateArray';


export class Scheme extends GenericEntity {

    Branch: Branch;
    Names?: Array<KeyValue> = undefined;
    Description?: string = undefined;
    Descriptions?: Array<KeyValue> = undefined;
    Settings?: Array<KeyValue> = undefined;

    constructor() {
        super();
    }
}


export class SchemePredicate extends GenericPredicate {
    Schemes?: PredicateArray<Scheme>;
    BranchPredicate?: BranchPredicate;
}