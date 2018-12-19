import { PredicateArray } from '../../base/PredicateArray';
import { GenericEntity } from '../../base/GenericEntity';
import { KeyValue } from '../common/KeyValue';
import { Filestream } from '../common/Filestream';
import { DateTimeOffset } from '../../base/DateTimeOffset';
import { Organisation } from '../security/Organisation';
import { ArticleGroup } from '../../stock/ArticleGroup';
import { Article } from '../../stock/Article';
import { Branch } from './Branch';
import { Person } from './Person';

export enum NoteActionType {
    Undefined = 0,
    Branch = 1,
    ArticleGroup = 2,
    Article = 3,
    Post = 4
}

export class Note extends GenericEntity {

    Organisation?: Organisation = undefined;
    Branch?: Branch = undefined;
    Person?: Person = undefined;
    ArticleGroup?: ArticleGroup = undefined;
    Article?: Article = undefined;
    NoteActionType: NoteActionType = undefined;
    CreatedOn?: DateTimeOffset = undefined;
    Name?: string = undefined;
    Description?: string = undefined;
    Settings?: Array<KeyValue> = undefined;

    Latitude?: number;
    Longitude?: number;

    constructor() {
        super();
    }
}


export class NotePredicate {

}
