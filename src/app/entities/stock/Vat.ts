import { GenericEntity, GenericPredicate } from '../base/GenericEntity';
import { KeyValue } from '../framework/common/KeyValue';


export class Vat extends GenericEntity {
    Name?: string = undefined;
    Description?: string = undefined;
    Value?: number = undefined;
    IsDefault: boolean = undefined;
    Settings: Array<KeyValue> = undefined;

    constructor() {
        super();
    }
}

export class VatPredicate extends GenericPredicate {

}
