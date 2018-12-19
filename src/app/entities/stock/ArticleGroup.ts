import { PredicateArray } from '../base/PredicateArray';
import { Criteria, DateInterval, GenericEntity, GenericPredicate } from '../base/GenericEntity';
import { Filestream } from '../framework/common/Filestream';
import { KeyValue } from '../framework/common/KeyValue';
import { ArticleSplit } from './ArticleSplit';
import { DateTimeOffset } from '../base/DateTimeOffset';
import { ArticleSplitPredicate } from './ArticleSplit';
import { Article } from './Article';

export class ArticleGroup extends GenericEntity {

    Names: Array<KeyValue> = undefined;
    Description: string = undefined;
    Descriptions: Array<KeyValue> = undefined;
    Settings: Array<KeyValue> = undefined;
    ArticleSplit: ArticleSplit = undefined;
    Index: number = undefined;
    CreatedOn: DateTimeOffset = undefined;
    UpdatedOn: DateTimeOffset = undefined;
    DeletedOn: DateTimeOffset = undefined;
    Filestream: Filestream = undefined;
    Filestreams: Array<Filestream> = undefined;
    Articles: Array<Article> = undefined;

    constructor() {
        super();
    }
}

export class ArticleGroupPredicate extends GenericPredicate {
    ArticleGroups: PredicateArray<ArticleGroup> = new PredicateArray<ArticleGroup>();
    ArticleSplitPredicate: ArticleSplitPredicate = new ArticleSplitPredicate();
    DeletedOn: Criteria<DateInterval> = {
        Value: {}
    };
    UpdatedOn: Criteria<DateInterval> = undefined;
}