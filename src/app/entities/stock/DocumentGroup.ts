import { Criteria, DateInterval, GenericEntity, GenericPredicate } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Organisation } from '../framework/security/Organisation';
import { DocumentSplitPredicate, Document, DocumentPredicate, DateTimeOffset, DocumentSplit, Employee, Branch, Depot } from '../index';
import { PredicateArray } from '../base/PredicateArray';



export class DocumentGroup extends GenericEntity {

    DocumentSplit?: DocumentSplit;
    Organisation?:Organisation;
    Employee?: Employee;
    Branch?: Branch;
    Depot?: Depot;
    Description?: string;
    IsDefault?: boolean;
    CreatedOn?: DateTimeOffset;
    ApprovedOn?: DateTimeOffset;
    DocumentFrom?: DateTimeOffset;
    DocumentTo?: DateTimeOffset;
    CreditSum?: number;
    CreditVatSum?: number;
    DebitSum?: number;
    DebitVatSum?: number;
    PrimaryDebitSum?: number;
    Reference?: string;
    Settings?: Array<KeyValue>;
    Documents?: Array<Document>;
    DocumentPredicate?: DocumentPredicate;

    constructor() {
        super();
    }
}

export class DocumentGroupPredicate extends GenericPredicate {
    ApprovedOn?: Criteria<DateInterval>;
    DocumentSplitPredicate?: DocumentSplitPredicate;
    DocumentPredicate?: DocumentPredicate;
    DocumentGroups: PredicateArray<Document>;
}
