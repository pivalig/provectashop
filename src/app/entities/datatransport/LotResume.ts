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
import { ArticleGroup } from '../stock/ArticleGroup';
import { Depot, DepotPredicate } from '../stock/Depot';
import { DocumentActionType } from '../stock/Document';
import { PredicateArray } from '../base/PredicateArray';
import { DateTimeOffset } from '../base/DateTimeOffset';

export class LotResume extends GenericEntity {

    Organisation: Organisation;
    Document: Document;
    Employee: Employee;
    Person: Person;
    Contractor: Contractor;
    Branch: Branch;
    CreditDepot: Depot;
    DebitDepot: Depot;
    DocumentActionType: DocumentActionType;
    Article: Article;
    ArticleGroup: ArticleGroup;
    ApprovedOn: number;
    Count: number;

    QuantityMin: number;
    QuantityMax: number;
    QuantityAvg: number;
    QuantitySum: number;

    CreditPriceMin: number;
    CreditPriceMax: number;
    CreditPriceAvg: number;
    CreditPriceSum: number;

    CreditMin: number;
    CreditMax: number;
    CreditAvg: number;
    CreditSum: number;

    CreditVatRateMin: number;
    CreditVatRateMax: number;
    CreditVatRateAvg: number;
    CreditVatRateSum: number;

    CreditVatMin: number;
    CreditVatMax: number;
    CreditVatAvg: number;
    CreditVatSum: number;

    DebitPriceMin: number;
    DebitPriceMax: number;
    DebitPriceAvg: number;
    DebitPriceSum: number;

    DebitMin: number;
    DebitMax: number;
    DebitAvg: number;
    DebitSum: number;

    DebitVatRateMin: number;
    DebitVatRateMax: number;
    DebitVatRateAvg: number;
    DebitVatRateSum: number;

    DebitVatMin: number;
    DebitVatMax: number;
    DebitVatAvg: number;
    DebitVatSum: number;

    BalanceQuantityMin: number;
    BalanceQuantityMax: number;
    BalanceQuantityAvg: number;
    BalanceQuantitySum: number;

    BalanceCreditMin: number;
    BalanceCreditMax: number;
    BalanceCreditAvg: number;
    BalanceCreditSum: number;

    BalanceCreditVatMin: number;
    BalanceCreditVatMax: number;
    BalanceCreditVatAvg: number;
    BalanceCreditVatSum: number;

    BalanceDebitMin: number;
    BalanceDebitMax: number;
    BalanceDebitAvg: number;
    BalanceDebitSum: number;

    BalanceDebitVatMin: number;
    BalanceDebitVatMax: number;
    BalanceDebitVatAvg: number;
    BalanceDebitVatSum: number;

    PrimaryQuantityMin: number;
    PrimaryQuantityMax: number;
    PrimaryQuantityAvg: number;
    PrimaryQuantitySum: number;

    PrimaryDebitMin: number;
    PrimaryDebitMax: number;
    PrimaryDebitAvg: number;
    PrimaryDebitSum: number;

}