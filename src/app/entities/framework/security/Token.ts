import { Person } from '../owner/Person';
import { Employee } from '../owner/Employee';

export class Token {
    Person: Person = undefined;
    Code: string;
    Employee: Employee;
    Employees: Array<Employee>;

    constructor(code: string) {
        this.Code = code;
    }

}