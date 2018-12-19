import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';


export enum SplitPostType {
    None,
    Menu,
    Slider,
    News
}

export class PostSplit extends GenericEntity {
    Description: string = undefined;
    Settings: Array<KeyValue> = undefined;
    SplitPostType: SplitPostType = undefined;


    constructor() {
        super();
    }
}


export class PostSplitPredicate {
    PostSplits: PredicateArray<PostSplit> = new PredicateArray<PostSplit>();
    SplitPostTypes: PredicateArray<SplitPostType> = new PredicateArray<SplitPostType>();
    Codes: PredicateArray<string> = new PredicateArray<string>();
}
