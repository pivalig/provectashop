import { DateTimeOffset } from './DateTimeOffset';
import { Emplacement } from '../framework/security/Emplacement';
export enum EntityActionType {
    None,
    Create,
    Update,
    Delete,
    Save
}

export const enum FaultExceptionDetailType {
    Undefined,
    Expired,
    Unauthorised,
    Invalid,
    Locked
}

export class Pager {
    Pages: number = 0;
    Index: number = 0;
    Size: number = 0;
    StartLag: number = 0;
    Count: number = 0;
    Number: number = 0;
}

export class GenericOutput<T> {
    PermissionType: any = undefined;
    Entity: T = undefined;
    Entities: Array<T> = undefined;
    Pager: Pager = undefined;
}

export class Criteria<T>{
    IsExcluded?: boolean;
    Value: T;
}

export class Flags<T>{
    Enumerator: T;
    Number: number
}

export enum DateIntervalType {
    Undefined,
    Today,
    Yesterday,
    CurrentWeek,
    LastWeek,
    CurrentMonth,
    LastMonth,
    CurrentQuarter,
    LastQuarter,
    CurrentYear,
    LastYear
}

export class DateInterval {
    DateTimeOffsetNow?: DateTimeOffset;
    IncludeTime?: boolean;
    DateIntervalType?: DateIntervalType;
    DateTo?: DateTimeOffset;
    DateFrom?: DateTimeOffset;
}

export class GenericEntity {
    Id?: string = undefined;
    Code?: string = undefined;
    Name?: string = undefined;
    Version?: Array<any>[] = undefined;
    image?: string;
    thumbnail?: string;
    order?: any;
    Emplacement?: Emplacement;
    LocalId?: number;



    public Extend?(obj: any, strong: boolean = false) {
        if (obj) {
            for (let prop in obj) {
                if (strong) {
                    if (this.hasOwnProperty(prop) && obj.hasOwnProperty(prop) && obj[prop] != undefined) {
                        this[prop] = obj[prop];
                    }
                } else {
                    this[prop] = obj[prop];
                }
            }
        }
        return this;
    }
}

export enum SortType {
    Ascending = 0,
    Descending = 1
}

export class Sort {
    Index?: number;
    Name: string;
    SortType: SortType = SortType.Ascending;
}

export class GenericPredicate {
    IsExcluded: boolean;
    Pager: Pager;
    Columns: Array<string>;
    Hierarchy: any;
    Order: string;
    Sorts: Array<Sort> = new Array<Sort>();
    Group: Array<string>;
    GroupTop: string;
    GroupBottom: string;
}

export class AmountInterval {
    AmountFrom?: number = undefined;
    AmountTo?: number = undefined;
    AmountDate?: DateTimeOffset = undefined;
}

export enum SecurityRules {
    CanChangeProductPrice,
    CanSeeTheCustomersList
}