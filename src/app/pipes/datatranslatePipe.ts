import { Pipe, EventEmitter, ChangeDetectorRef, PipeTransform, OnDestroy } from '@angular/core';
import { CommonHelper } from '../helpers/CommonHelper';
import { TranslateService } from '@ngx-translate/core';


@Pipe({
  name: 'datatranslate',
  pure: false
})
export class DatatranslatePipe implements PipeTransform, OnDestroy {

  value: string;
  defaultvalue: string;
  subscription: EventEmitter<any>;

  constructor(public _common: CommonHelper, public translate: TranslateService, public _ref: ChangeDetectorRef) { }

  transform(value, defaultValue?: any) {
    this.defaultvalue = defaultValue;

    if (value || defaultValue) {
      //console.log(value,defaultValue)
      this.value = CommonHelper.getDataSense(value, defaultValue || '')
    } else {
      this.value = value;
    }

    this._ref.markForCheck();

    this.ngOnDestroy();

    this.subscription = this.translate.onLangChange.subscribe(res => {

      this.transform(this.value, this.defaultvalue);
    })

    return this.value;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

  }
}
