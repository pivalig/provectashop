import { Organisation, OrganisationPredicate } from '../security/Organisation';
import { GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { PredicateArray } from '../../base/PredicateArray';

export enum BranchActionType {
    None = 0,
    OrderSupplier = 1,
    OrderConsumer = 2,
    Stock = 4,
    Public = 8
}

export class BranchPredicate extends GenericPredicate {
    Branches: PredicateArray<Branch> = new PredicateArray<Branch>();
    OrganisationPredicate: OrganisationPredicate = new OrganisationPredicate();
    Distance: any;
    LoadBranchGroups: boolean;
    //System groups
    LoadGroups: boolean;
    LoadFilestreams: boolean;
}

export class Branch extends GenericEntity {

    Names: Array<KeyValue> = undefined;

    Address: string = undefined;
    Addresses: Array<KeyValue> = undefined;

    Schedule: string = undefined;
    Schedules: Array<KeyValue> = undefined;

    Description: string = undefined;
    Descriptions: Array<KeyValue> = undefined;

    Phone: string = undefined;
    Contact: string = undefined;

    BranchActionType: BranchActionType = undefined;

    Latitude: number = undefined;
    Longitude: number = undefined;

    Organisation: Organisation = undefined;
    Settings: Array<KeyValue> = undefined;

    LockedOn: Date = undefined;
    CreatedOn: Date = undefined;
    UpdatedOn: Date = undefined;
    DeletedOn: Date = undefined;

    Filestream: Filestream = undefined;
    Filestreams: Array<Filestream> = undefined;

    BranchGroups: Array<BranchGroup> = undefined;

    //System split groups
    Groups: Array<BranchGroup> = undefined;

    Distance: number = undefined;


    constructor() {
        super();
    }
}

export const enum SplitBranchType {
    None,
    City,
    Service
}

export class BranchSplit extends GenericEntity {
    SplitBranchType: SplitBranchType;
    Name: string = undefined;
    Names: Array<KeyValue> = undefined;
    Settings: Array<KeyValue> = undefined;
    Organisation: Organisation = undefined;

    constructor() {
        super();
    }
}

export class BranchSplitPredicate extends GenericPredicate {
    SplitBranchTypes: PredicateArray<SplitBranchType> = new PredicateArray<SplitBranchType>();
    BranchSplits: PredicateArray<BranchSplit> = new PredicateArray<BranchSplit>();
}

export class BranchGroup extends GenericEntity {
    BranchSplit: BranchSplit;
    Name: string = undefined;
    Names: Array<KeyValue> = undefined;
    Description: string = undefined;
    Descriptions: Array<KeyValue> = undefined;

    IsDefault: boolean = false;
    Settings: Array<KeyValue> = undefined;
    Organisation: Organisation = undefined;

    Index: number = undefined;

    Filestream: Filestream = undefined;
    Filestreams: Array<Filestream> = undefined;
    Branches: Array<Branch> = undefined;

    CreatedOn: Date = undefined;
    UpdatedOn: Date = undefined;
    DeletedOn: Date = undefined;


    constructor() {
        super();
    }
}

export class BranchGroupPredicate extends GenericPredicate {
    BranchGroups: PredicateArray<BranchGroup> = new PredicateArray<BranchGroup>();
    BranchSplitPredicate: BranchSplitPredicate = new BranchSplitPredicate();
    BranchPredicate: BranchPredicate = new BranchPredicate();
}