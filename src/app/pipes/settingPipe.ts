import { Injectable, Pipe } from '@angular/core';
import { CommonHelper } from '../helpers/CommonHelper'

@Pipe({
  name: 'setting'
})
@Injectable()
export class SettingsPipe {

  constructor() {

  }

  transform(entity, key?: any) {
    if (entity && entity.Settings) {
      return CommonHelper.getSettingValueByKey(entity, key)
    }
    return null;
  }
}
