import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity } from '../../base/GenericEntity';
import { DateTimeOffset } from '../../base/DateTimeOffset';
import { KeyValue } from '../common/KeyValue';


export enum LayoutEntityType {
    Undefined,
    Discount,
    Price,
    Receipt,
    Showcase
}

export class Layout extends GenericEntity {
    Description: string = undefined;
    Settings: Array<KeyValue> = undefined;
    LayoutEntityType: LayoutEntityType = undefined;

    constructor() {
        super();
    }
}


export class LayoutPredicate {
    Layouts: PredicateArray<Layout> = new PredicateArray<Layout>();
    LayoutEntityTypes: PredicateArray<LayoutEntityType> = new PredicateArray<LayoutEntityType>();
    Codes: PredicateArray<string> = new PredicateArray<string>();
}


export enum DiscountType {
    Percent = 1,
    Amount = 2
}

export enum ScheduleType {
    Constantly = 1,
    Periodic = 2
}


export interface IDiscount {

    Type: DiscountType;
    Active: boolean;
    Value: number;
    schedule: {
        type: ScheduleType
    };
    periods: Array<{ from: number, to: number }>;
    WeekDays: Array<{ id: number, text: string, selected: boolean }>;
    StartOn: DateTimeOffset;
    EndOn: DateTimeOffset;
    branches: Array<string>;
    products: Array<string>;
    customers: Array<string>;
    groups: Array<string>;
    CollectionsConcidence:boolean;
    ExcludeFromOtherDiscunts:boolean;
}