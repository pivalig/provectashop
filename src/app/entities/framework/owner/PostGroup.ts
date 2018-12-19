import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { PostSplit,PostSplitPredicate } from './PostSplit';
import { Post } from './Post';



export class PostGroup extends GenericEntity {

    PostSplit: PostSplit = undefined;
    Names: Array<KeyValue> = undefined;
    Description: string = undefined;
    Descriptions: Array<KeyValue> = undefined;
    Settings: Array<KeyValue> = undefined;
    Posts: Array<Post> = undefined;
    IsDefault: boolean = undefined;
    CreatedOn: Date = undefined;
    UpdatedOn: Date = undefined;
    DeletedOn: Date = undefined;
    Filestream: Filestream = undefined;
    Filestreams: Array<Filestream> = undefined;


    constructor() {
        super();
    }
}


export class PostGroupPredicate {
    PostGroups: PredicateArray<PostGroup> = new PredicateArray<PostGroup>();
    PostSplitPredicate: PostSplitPredicate = new PostSplitPredicate();
    Codes: PredicateArray<string> = new PredicateArray<string>();
    LoadFilestreams:boolean;
    LoadPosts:boolean;
}
