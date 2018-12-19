import { GenericEntity, GenericPredicate, GenericOutput } from '../../base/GenericEntity';
import { KeyValue } from '../../framework/common/KeyValue';
import { PredicateArray } from '../../base/PredicateArray';
import { DateTimeOffset } from '../../base/DateTimeOffset';
import { PersonPredicate, Person } from './Person';
import { Branch } from './Branch';
import { Post } from './Post';
import { Article } from '../../index';

export enum MarkEntityType {
    Undefined = 0,
    Branch = 1,
    Post = 2,
    Article = 101
}

export enum MarkActionType {
    Undefined = 0,
    Like = 1,
    Dislike = 2
}

export class MarkPredicate extends GenericPredicate {
    MarkEntityTypes: PredicateArray<MarkEntityType> = new PredicateArray<MarkEntityType>();
    EntityIds: PredicateArray<string> = new PredicateArray<string>();
    MarkActionTypes: PredicateArray<MarkActionType> = new PredicateArray<MarkActionType>();
    PersonPredicate: PersonPredicate = new PersonPredicate();
    LoadBranches: boolean;
    LoadPosts: boolean;
    LoadArticles: boolean;
}

export class MarkResume {
    Person: Person = undefined;
    MarkEntityType: MarkEntityType = MarkEntityType.Undefined;
    EntityId: string = undefined;
    MarkActionType: MarkActionType = MarkActionType.Undefined;
    CreatedOn?: DateTimeOffset = undefined;
    Count: number = undefined;
}

export class MarkOutput {
    GenericOutput: GenericOutput<Mark>;
    Branches: Array<Branch>;
    Posts: Array<Post>;
    Articles: Array<Article>
}

export class Mark extends GenericEntity {

    Person?: Person = undefined;
    MarkEntityType: MarkEntityType = MarkEntityType.Undefined;
    EntityId: string = undefined;
    CreatedOn?: DateTimeOffset = undefined;
    UpdatedOn?: DateTimeOffset = undefined;
    MarkActionType: MarkActionType = MarkActionType.Undefined;
    Comment?: string = undefined;
    Settings?: Array<KeyValue> = undefined;

    constructor() {
        super();
    }

}