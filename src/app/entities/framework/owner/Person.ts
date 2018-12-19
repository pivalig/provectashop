import { GenericEntity } from '../../base/GenericEntity';
import { User } from '../../framework/security/User';
import { KeyValue } from '../../framework/common/KeyValue';
import { PredicateArray } from '../../base/PredicateArray';

export const enum PersonSexType {
    Undefined,
    Male,
    Female
}

export class Person extends GenericEntity {
    Id: string = undefined;
    IDNP: string = undefined;
    FirstName: string = undefined;
    LastName: string = undefined;
    Name: string = undefined;
    Patronymic: string = undefined;
    BornOn: Date = undefined;
    Email: string = undefined;
    Phone: string = undefined;
    PersonSexType: PersonSexType = PersonSexType.Undefined;
    User: User = undefined;
    Settings: Array<KeyValue> = [];
    Filestreams: Array<any>;


    constructor() {
        super();
    }
}

export class PersonPredicate {
    Persons: PredicateArray<Person> = new PredicateArray<Person>();
}