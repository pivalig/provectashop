import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity, Criteria, GenericPredicate } from '../../base/GenericEntity';
import { DateTimeOffset } from '../../base/DateTimeOffset';
import { KeyValue } from './KeyValue';

export enum DeviceType {
    Undefined,
    CashRegister,
    LabelPrinter,
    ThermalPrinter,
    Scale,
    DisplayAdapter
}

export class Device extends GenericEntity {
    DeviceType?: DeviceType;
    Brand?: string;
    Model?: string;
    LockedOn?: DateTimeOffset;
    Settings?: Array<KeyValue>;

    super() {
    }
}

export class DevicePredicate {
    DeviceTypes: PredicateArray<DeviceType> = new PredicateArray<DeviceType>();
    Brands: PredicateArray<string> = new PredicateArray<string>();
}