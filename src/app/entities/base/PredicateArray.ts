interface IPredicateArray<T> {
    IsExcluded: boolean;
    Value: Array<T>;
}

export class PredicateArray<T>  {
    IsExcluded?: boolean;
    Value: Array<T> = [];
}