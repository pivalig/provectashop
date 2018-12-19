import { Criteria, GenericEntity, GenericPredicate, Flags, AmountInterval } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Organisation,OrganisationPredicate } from '../framework/security/Organisation';
import { Pricelist, PricelistPredicate } from './Pricelist';
import { Article, ArticlePredicate } from './Article';
import { PredicateArray } from '../base/PredicateArray';
import { DateTimeOffset } from '../base/DateTimeOffset';
import { DateInterval } from '../index';


export class PricelistItem extends GenericEntity {
    Pricelist?: Pricelist = undefined;
    Article?: Article = undefined;
    PriceMin?: number = undefined;
    PriceMax?: number = undefined;
    KeptOn?: DateTimeOffset = undefined;
    LockedOn?: DateTimeOffset = undefined;
    Description?: string = undefined;
    CreatedOn: DateTimeOffset = undefined;
    UpdatedOn: DateTimeOffset = undefined;
    DeletedOn: DateTimeOffset = undefined;


    constructor() {
        super();
    }
}

export class PricelistItemPredicate extends GenericPredicate {
    OrganisationPredicate?: OrganisationPredicate = new OrganisationPredicate();
    PricelistPredicate?: PricelistPredicate = new PricelistPredicate();
    ArticlePredicate?: ArticlePredicate = new ArticlePredicate();
    PriceMax?: Criteria<AmountInterval> = new Criteria<AmountInterval>();
    LoadArticleGroups?: boolean;
    UpdatedOn?: Criteria<DateInterval> = undefined;
    DeletedOn?: Criteria<DateInterval> = {
        Value: {}
    };

}

