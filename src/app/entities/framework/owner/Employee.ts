import { GenericEntity, GenericPredicate } from '../../base/GenericEntity';
import { Organisation } from '../security/Organisation';
import { Person } from '../owner/Person';
import { PredicateArray } from '../../base/PredicateArray';
import { Filestream } from '../../framework/common/Filestream';
import { KeyValue } from '../../framework/common/KeyValue';

export const enum EmployeeActorType {
    Undefined,
    OperationalAdministrator,
    OperationalViewer,
    OperationalSeller,
    OrderViewer,
    OrderConsumer
}

export class Employee extends GenericEntity {
    Person: Person = undefined;
    Organisation: Organisation = undefined;
    Function: string = undefined;
    EmployeeActorType: EmployeeActorType = EmployeeActorType.Undefined;
    Phone: string = undefined;
    Filestream: any = undefined;

    constructor() {
        super();
    }
}

export class EmployeePredicate extends GenericPredicate {
    EmployeeActorTypes: PredicateArray<EmployeeActorType> = new PredicateArray<EmployeeActorType>();
    Employees:PredicateArray<Employee>;
}