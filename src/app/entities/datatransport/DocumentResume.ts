import { EntityActionType, GenericEntity, GenericPredicate } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Organisation } from '../framework/security/Organisation';
import { Employee } from '../framework/owner/Employee';
import { Contractor } from '../framework/owner/Contractor';
import { Person, PersonPredicate } from '../framework/owner/Person';
import { Branch, BranchPredicate } from '../framework/owner/Branch';
import { EmployeePredicate } from '../framework/owner/Employee';
import { Lot } from '../stock/Lot';
import { Article } from '../stock/Article';
import { Depot, DepotPredicate } from '../stock/Depot';
import { DocumentActionType } from '../stock/Document';
import { PredicateArray } from '../base/PredicateArray';
import { DateTimeOffset } from '../base/DateTimeOffset';

export class DocumentResume extends GenericEntity {

    Organisation: Organisation;
    Employee: Employee;
    Person: Person;
    Contractor: Contractor;
    Branch: Branch;
    CreditDepot: Depot;
    DebitDepot: Depot;
    Article: Article;
    DocumentActionType: DocumentActionType;
    ApprovedOn: number;
    Count: number;

    CreditMin: number;
    CreditMax: number;
    CreditAvg: number;
    CreditSum: number;

    CreditVatMin: number;
    CreditVatMax: number;
    CreditVatAvg: number;
    CreditVatSum: number;

    DebitMin: number;
    DebitMax: number;
    DebitAvg: number;
    DebitSum: number;

    DebitVatMin: number;
    DebitVatMax: number;
    DebitVatAvg: number;
    DebitVatSum: number;

    PrimaryDebitMin: number;
    PrimaryDebitMax: number;
    PrimaryDebitAvg: number;
    PrimaryDebitSum: number;

}