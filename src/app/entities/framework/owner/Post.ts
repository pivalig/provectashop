import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity, GenericPredicate,Flags } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { PostGroup, PostGroupPredicate } from './PostGroup';
import { DateTimeOffset } from '../../base/DateTimeOffset';
import { Organisation } from '../../framework/security/Organisation';

export enum PostActionType {
    None = 0,
    Public = 1,
    Slider = 2
}

export class Post extends GenericEntity {

    Date?: DateTimeOffset = undefined;
    Title?: string = undefined;
    Titles?: Array<KeyValue> = undefined;

    Subject?: string = undefined;
    Subjects?: Array<KeyValue> = undefined;

    Body?: string = undefined;
    Bodies?: Array<KeyValue> = undefined;

    Urls?: Array<KeyValue> = undefined;
    Links?: Array<KeyValue> = undefined;

    PostGroups?: Array<PostGroup> = undefined;
    Settings?: Array<KeyValue> = undefined;

    CreatedOn?: DateTimeOffset = undefined;
    UpdatedOn?: DateTimeOffset = undefined;
    DeletedOn?: DateTimeOffset = undefined;
    Filestream?: Filestream = undefined;
    Filestreams?: Array<Filestream> = undefined;
    Organisation?:Organisation = undefined;

    constructor() {
        super();
    }
}


export class PostPredicate extends GenericPredicate {
    Posts: PredicateArray<Post> = new PredicateArray<Post>();
    PostActionType: PredicateArray<Flags<PostActionType>> = new PredicateArray<Flags<PostActionType>>();
    PostGroupPredicate: PostGroupPredicate = new PostGroupPredicate();
    Codes: PredicateArray<string> = new PredicateArray<string>();
    LoadPostGroups: boolean;
    LoadFilestreams: boolean;
}
