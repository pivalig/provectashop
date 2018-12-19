import { GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { Organisation } from '../security/Organisation';
import { KeyValue } from '../../framework/common/KeyValue';
import { Filestream } from '../../framework/common/Filestream';
import { PredicateArray } from '../../base/PredicateArray';
import { DateTimeOffset } from '../../base/DateTimeOffset';

export enum ContractorActionType {
    Undefined,
    Individual,
    Legal
}

export enum ContractorGenderType {
    Undefined,
    Male,
    Female
}

export class Contractor extends GenericEntity {

    Organisation: Organisation;
    Name: string;
    Number: string;
    ContractorActionType: ContractorActionType;
    FirstName: string;
    LastName: string;
    BornOn: DateTimeOffset;
    ContractorGenderType: ContractorGenderType;
    Email: string;
    Phone: string;
    Address: string;
    Reference: string;
    Account: string;
    Settings: Array<KeyValue> = [];
    Filestream: Filestream;
    Filestreams: Array<Filestream>;


    constructor() {
        super();
    }

}

export class ContractorPredicate extends GenericPredicate {
    ContractorActionTypes: PredicateArray<ContractorActionType>;
}