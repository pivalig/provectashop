import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity, GenericPredicate } from '../../base/GenericEntity';

export class Filestream extends GenericEntity {
    EntityId?: string = undefined;
    ReferenceId?: string = undefined;
    Name?: string = undefined;
    Description?: string = undefined;
    Extension?: string = undefined;
    Data?: Array<any> = undefined;
    IsDefault?: boolean = undefined;
    Url?: string = undefined;
    ThumbnailId?: string = undefined;
    ThumbnailWidth?: number = undefined;
    ThumbnailHeight?: number = undefined;
    ThumbnailExtension?: string = undefined;
    ThumbnailUrl?: string = undefined;

    constructor() {
        super();
    }
}

export class FilestreamPredicate extends GenericPredicate {
    EntityIds: PredicateArray<string> = new PredicateArray<string>();
}

