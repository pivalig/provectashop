import { Organisation } from '../framework/security/Organisation';
import { PredicateArray } from '../base/PredicateArray';
import { GenericEntity } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';


export enum SplitActionType {
    None,
    Vat,
    Size,
    Color,
    Model,
    Promotion,
    Group,
    Dish,
    Topping,
    Sauce,
    Modifier
}


export class ArticleSplitPredicate {
    ArticleSplits: PredicateArray<ArticleSplit> = new PredicateArray<ArticleSplit>();
    SplitActionTypes: PredicateArray<SplitActionType> = new PredicateArray<SplitActionType>();
}

export class ArticleSplit extends GenericEntity {

    Organisation: Organisation = undefined;
    SplitActionType: SplitActionType = undefined;
    Names: Array<KeyValue> = undefined;
    Settings: Array<KeyValue> = undefined;
    IsSystem: boolean = undefined;
    IsExclusive: boolean = undefined;

    constructor() {
        super();
    }

}
