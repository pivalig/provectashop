import { Organisation, OrganisationPredicate } from '../security/Organisation';
import { GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { PredicateArray } from '../../base/PredicateArray';
import { Branch, BranchPredicate } from './Branch';
import { Device} from '../common/Device';

export enum UnitDeviceType {
    Undefined = 0,
    Cash = 1,
    Scale = 2,
    LabelPrinter = 3,
    ThermalPrinter = 4,
    MobileScanner = 5,
    DisplayAdapter = 6
}

export class BranchUnitPredicate extends GenericPredicate {
    UnitDeviceTypes?: PredicateArray<UnitDeviceType>;
    BranchUnits?: PredicateArray<BranchUnit>;
    BranchPredicate?: BranchPredicate;
}

export class BranchUnit extends GenericEntity {

    Branch?: Branch;
    UnitDeviceType?: UnitDeviceType;
    Description?: string;
    IsDefault?: boolean;
    Settings?: Array<KeyValue> = undefined;
    Device?:Device;
    IsFiscalOk:boolean;

    constructor() {
        super();
    }
}
