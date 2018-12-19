import { Criteria, GenericEntity, GenericPredicate, Flags } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Organisation } from '../framework/security/Organisation';
import { Depot, DepotPredicate } from './Depot';
import { PredicateArray } from '../base/PredicateArray';
import { DateTimeOffset } from '../base/DateTimeOffset';

export class Pricelist extends GenericEntity {
    Depot?: Depot = undefined;
    Name?: string = undefined;
    Description?: string = undefined;
    CreatedOn?: DateTimeOffset = undefined;
    IsDefault?: boolean = undefined;

    constructor() {
        super();
    }
}

export class PricelistPredicate extends GenericPredicate {
    DepotPredicate: DepotPredicate = new DepotPredicate();
    Pricelists: Criteria<Array<Pricelist>> = new Criteria<Array<Pricelist>>();
}
