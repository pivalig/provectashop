import { Criteria, GenericEntity, GenericPredicate, Flags } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Organisation } from '../framework/security/Organisation';
import { Employee } from '../framework/owner/Employee';
import { Person } from '../framework/owner/Person';
import { Branch, BranchPredicate } from '../framework/owner/Branch';
import { PredicateArray } from '../base/PredicateArray';
import { DateTimeOffset } from '../base/DateTimeOffset';

export enum DepotActionType {
    None = 0,
    Pricelist = 1,
    Document = 2
}

export class Depot extends GenericEntity {
    Branch?: Branch = undefined;
    Name?: string = undefined;
    Description?: string = undefined;
    DepotActionType: Flags<DepotActionType> = undefined;
    IsDefault: boolean = undefined;
    Settings: Array<KeyValue> = undefined;

    constructor() {
        super();
    }
}

export class DepotPredicate extends GenericPredicate {
    Depots: PredicateArray<Depot>;
    BranchPredicate: BranchPredicate = new BranchPredicate();
    DepotActionType: Criteria<Flags<DepotActionType>> = new Criteria<Flags<DepotActionType>>()

}
