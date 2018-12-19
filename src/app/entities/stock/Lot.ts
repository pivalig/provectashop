import { GenericEntity, GenericPredicate, Criteria, AmountInterval } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { DocumentPredicate } from './Document';
import { ArticlePredicate, Article } from './Article';
import { Branch } from '../framework/owner/branch';


export class LotPredicate extends GenericPredicate {
    DocumentPredicate: DocumentPredicate = new DocumentPredicate();
    IsBalanced: boolean;
    BalanceQuantity: Criteria<AmountInterval>;
    ArticlePredicate: ArticlePredicate;

}

export class Lot extends GenericEntity {
    Article: Article = undefined;
    Number: string = undefined;
    Quantity: number = undefined;
    CreditPrice: number = undefined;
    CreditSum: number = undefined;
    CreditVatRate: number = undefined;
    CreditVatSum: number = undefined;
    DebitPrice: number = undefined;
    DebitSum: number = undefined;
    DebitVatRate: number = undefined;
    DebitVatSum: number = undefined;
    BalanceQuantity: number = undefined;
    BalanceCreditSum: number = undefined;
    BalanceCreditVatSum: number = undefined;
    BalanceDebitSum: number = undefined;
    BalanceDebitVatSum: number = undefined;
    PrimaryQuantity: number = undefined;
    PrimaryDebitSum: number = undefined;
    PrimaryDebitPrice: number = undefined;

    Settings: Array<KeyValue> = undefined;
    Lots: Array<Lot> = undefined;
    Document: Document = undefined;
    Branch: Branch = undefined;

    constructor() {
        super();
    }


    getTotalAmount(): number {
        let result = 0;
        if (this.Lots && this.Lots.length > 0) {
            this.Lots.forEach(element => {
                result += element.getTotalAmount();
            });
        }

        result = result * this.Quantity;

        if (this.Quantity && this.DebitPrice) {

            result += this.Quantity * this.DebitPrice;
        }

        if(result){
            result = Number(result.toFixed(2));
        }
        return result || 0;
    }

    getDiscountSum(): number {
        let result = 0;

        if (this.Lots && this.Lots.length > 0) {
            this.Lots.forEach(element => {
                result += element.getDiscountSum();
            });
        }

        result = result * this.Quantity;

        if (this.Quantity && this.DebitPrice < this.PrimaryDebitPrice) {

            result += this.Quantity * (this.PrimaryDebitPrice - this.DebitPrice);
        }
        return result || 0;
    }
}