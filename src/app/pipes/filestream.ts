import { Injectable, Pipe, ChangeDetectorRef } from '@angular/core';
import { CommonHelper} from '../helpers/CommonHelper';


@Pipe({
    name: 'filestream',
    pure: false
})
@Injectable()
export class FilestreamPipe {

    source: any;

    constructor(public _ref: ChangeDetectorRef) {

    }

    transform(value, args?: any) {
        let result = CommonHelper.getImageSrc(value);
        if (!result && args) {
            result = args;
        }

    if (!result) {
      result = '/assets/img/default_image.png';
    }

        this.source = result;
        this._ref.markForCheck();
        return result;
    }
}
