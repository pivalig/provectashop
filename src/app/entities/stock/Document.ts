import { EntityActionType, GenericEntity, GenericPredicate, Criteria, AmountInterval, DateInterval } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { OrganisationPredicate, Organisation } from '../framework/security/Organisation';
import { Employee } from '../framework/owner/Employee';
import { Contractor } from '../framework/owner/Contractor';
import { Person, PersonPredicate } from '../framework/owner/Person';
import { Branch, BranchPredicate } from '../framework/owner/Branch';
import { Tender, TenderPredicate } from '../framework/owner/Tender';
import { EmployeePredicate } from '../framework/owner/Employee';
import { Lot } from './Lot';
import { DocumentGroupPredicate } from './DocumentGroup';
import { Depot, DepotPredicate } from './Depot';
import { PredicateArray } from '../base/PredicateArray';
import { DateTimeOffset } from '../base/DateTimeOffset';


export const enum DocumentActionType {
    None = 0,
    Income = 1,

    Outcome = 2,
    Check = 3,
    Transfer = 4,
    Revaluation = 5,
    Order = 6,
    Inventory = 7,
    Calculation = 8
}

export const enum DocumentOperationType {
    IncomeRegular = 1,
    OutcomeRegular = 2,
    InventoryRegular = 3,
    ReturnRegular = 4,
    OutcomeWriteOff = 5,
    OutcomeCalculation = 6,
    OrderOnline = 7
}

export class Document extends GenericEntity {
    Organisation: Organisation = undefined;
    Number?: string;
    Employee: Employee = undefined;
    Person: Person = undefined;
    Branch: Branch = undefined;
    CreditDepot: Depot = undefined;
    DebitDepot: Depot = undefined;
    Quantity: number = undefined;
    CreditSum: number = undefined;
    CreditVatSum: number = undefined;
    DebitSum: number = undefined;
    DebitVatSum: number = undefined;
    PrimaryDebitSum: number = undefined;
    Lots: Array<Lot> = undefined;
    Settings: Array<KeyValue> = undefined;
    Contractor: Contractor = undefined;
    ApprovedOn: DateTimeOffset = undefined;
    Tender: Tender = undefined

    DocumentActionType: DocumentActionType = undefined;
    DocumentOperationType: DocumentOperationType = undefined;
    EntityActionType?: EntityActionType;

    CreatedOn: DateTimeOffset = undefined;
    UpdatedOn: DateTimeOffset = undefined;
    DeletedOn: DateTimeOffset = undefined;

    constructor(document?: Document) {
        super();

        if (document) {
            if (document.Lots) {
                document.Lots.forEach((lot, index) => {
                    document.Lots[index] = new Lot().Extend(lot, true);
                    let f = document.Lots[index].getTotalAmount();
                });
            }
            this.Extend(document, true);
            //let a = this.getTotalAmount();
        }
    }

    getTotalAmountBeforeDiscount(): number {
        let result = this.getTotalAmount();
        let discount = 0;

        if (this.Lots != null) {
            discount = this.Lots.reduce((amount, lot) => {
                return amount + lot.getDiscountSum()
            }, 0)
        }

        if (discount != 0) {
            result += discount;
        }

        return result || 0;
    }

    getDiscountSum(): number {
        let result = 0;

        if (this.Lots != null) {
            result = this.Lots.reduce((amount, lot) => {
                return amount + lot.getDiscountSum()
            }, 0)
        }

        return result || 0;
    }

    getTotalAmount(): number {
        let result = 0;

        if (this.Lots != null) {
            result = this.Lots.reduce((amount, lot) => {
                return amount + lot.getTotalAmount()
            }, 0)
        }

        return result;
    }

    getTotalCount(): number {
        let result = 0;

        if (this.Lots != null) {
            result = this.Lots.reduce((amount, lot) => {
                return amount + lot.Quantity
            }, 0)
        }

        return result;
    }

    getProductsCount(): number {
        let result = 0;

        if (this.Lots != null) {
            let distincts = new Array<string>();
            this.Lots.forEach((lot: Lot) => {
                if (distincts.findIndex(x => x == lot.Article.Id) < 0) {
                    distincts.push(lot.Article.Id);
                }
            });
            result = distincts.length;
        }

        return result;
    }
}

export class DocumentPredicate extends GenericPredicate {
    Documents: PredicateArray<Document> = new PredicateArray<Document>();
    DocumentGroupPredicate: DocumentGroupPredicate;
    DocumentActionTypes: PredicateArray<DocumentActionType> = new PredicateArray<DocumentActionType>();
    CreditDepotPredicate: DepotPredicate = new DepotPredicate();
    DebitDepotPredicate: DepotPredicate = new DepotPredicate();
    BranchPredicate: BranchPredicate = new BranchPredicate();
    EmployeePredicate: EmployeePredicate = new EmployeePredicate();
    PersonPredicate: PersonPredicate = new PersonPredicate();
    DocumentGroupExclude: boolean;
    OrganisationPredicate?: OrganisationPredicate;
    ApprovedOn?: Criteria<DateInterval>;
    TenderPredicate?: TenderPredicate;
}