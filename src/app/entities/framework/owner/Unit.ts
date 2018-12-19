import { Organisation, OrganisationPredicate } from '../security/Organisation';
import { Criteria, GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { Branch, BranchPredicate } from './Branch';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { PredicateArray } from '../../base/PredicateArray';

export enum UnitActionType {
    None = 0,
    Table = 1
}


export class Unit extends GenericEntity {

    Branch?: Branch;
    UnitActionType?: UnitActionType;
    Names?: Array<KeyValue> = undefined;
    Description?: string = undefined;
    Descriptions?: Array<KeyValue> = undefined;
    Settings?: Array<KeyValue> = undefined;

    constructor() {
        super();
    }
}


export class UnitPredicate extends GenericPredicate {
    Units?: PredicateArray<Unit>;
    BranchPredicate?: BranchPredicate;
    UnitActionTypes?: Criteria<UnitActionType>;
}