import { Organisation, OrganisationPredicate } from '../framework/security/Organisation';
import { ArticleGroup, ArticleGroupPredicate } from '../stock/ArticleGroup';
import { PredicateArray } from '../base/PredicateArray';
import { GenericEntity, GenericPredicate, Criteria, DateInterval, AmountInterval, Flags } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';
import { Filestream } from '../framework/common/Filestream';
import { DateTimeOffset } from '../base/DateTimeOffset';


export enum ArticleActionType {
    None = 0,
    Product = 1,
    CalculateIn = 2,
    CalculateOut = 4,
    Service = 8
}

export enum ArticleMeasureType {
    Piece = 1,
    Weighted = 2
}

export class ArticlePredicate extends GenericPredicate {
    ArticleGroupPredicate: ArticleGroupPredicate = new ArticleGroupPredicate();
    OrganisationPredicate: OrganisationPredicate = new OrganisationPredicate();
    Articles: PredicateArray<Article> = new PredicateArray<Article>();
    // ArticleActionType: Criteria<Flags<ArticleActionType>> = {
    //       Value: {
    //         Enumerator: ArticleActionType.Product | ArticleActionType.Dish,
    //         Number: ArticleActionType.Product | ArticleActionType.Dish
    //       }
    // };
    ArticleMeasureTypes: PredicateArray<ArticleMeasureType>;
    UpdatedOn: Criteria<DateInterval> = undefined;
    DeletedOn: Criteria<DateInterval> = {
        Value: {}
    };
    LoadArticleGroups: boolean;
    LoadFilestreams: boolean;
    Price: Criteria<AmountInterval> = new Criteria<AmountInterval>();
}
export interface IArticle {
    Id?: string;
}

export class Article extends GenericEntity implements IArticle {

    ArticleParentId?: string = undefined;
    Organisation?: Organisation = undefined;
    Barcode?: string = undefined;
    Price?: number = undefined;

    Names?: Array<KeyValue> = undefined;

    Description?: string = undefined;
    Descriptions?: Array<KeyValue> = undefined;

    ArticleActionType?: any = undefined

    ArticleGroups?: Array<ArticleGroup> = undefined;
    Filestream?: Filestream = undefined;
    Filestreams?: Array<Filestream> = undefined;

    Settings?: Array<KeyValue> = undefined;
    CreatedOn?: DateTimeOffset = undefined;
    UpdatedOn?: DateTimeOffset = undefined;
    DeletedOn?: DateTimeOffset = undefined;
    ArticleMeasureType?: ArticleMeasureType = undefined;
    //Plu uniquie by ArticleMeasureType
    Index?: number = undefined;
    Quantity?: number;
    Promoted?: boolean;
    Childs?: number;
    Articles?: Array<Article>;

    constructor() {
        super();
    }

}
