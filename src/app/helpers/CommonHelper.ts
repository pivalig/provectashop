import { Injectable } from '@angular/core';
import { AppSettings } from "../shared/AppSettings";
import { IKeyValue, DateTimeOffset, Pager } from "../entities/index";
import { Location } from '@angular/common';

@Injectable()
export class CommonHelper {
    public static location: Location;


    static s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    static generateGuid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    static canLoadMore(pager: Pager): boolean {
        return pager && pager.Number - (pager.Index + 1) * pager.Size > 0;
    }

    public static getQueryLanguageCode() {
        const pathArray = this.location.path().split('?');

        let query = pathArray.length > 1 ? pathArray[1] : undefined;

        if (!query || !query.length) {
            return null;

        } else {

            if (query.indexOf('lang=') >= 0) {
                return query.substr(query.indexOf('lang=') + 5, 2) || '';

            } else {
                return null;
            }
        }
    }

    static getThumbnailSrc(filestream: any) {

        if (!filestream) return null;

        if (filestream.ThumbnailUrl && filestream.ThumbnailUrl.length > 0) {
            return filestream.ThumbnailUrl;
        }
        else {
            if (filestream.ThumbnailExtension && filestream.ThumbnailExtension.length > 0) {
                return AppSettings.FilestreamEndpoint + filestream.ThumbnailId + filestream.ThumbnailExtension;
            }
        }
        return null;
    }

    static getImageSrc(filestream: any) {

        if (!filestream) return null;

        if (filestream.Url && filestream.Url.length > 0) {
            return filestream.Url;
        }
        else {

            if (filestream.Extension && filestream.Extension.length > 0) {
                return AppSettings.FilestreamEndpoint + filestream.ReferenceId + filestream.Extension;
            }
        }

        return null;
    }


    static getDataSense(values: Array<IKeyValue>, defaultValue: string): string {

        if (!values) {
            return defaultValue;
        }

        let result = defaultValue;

        const lang = AppSettings.currentLang || this.getQueryLanguageCode();

        for (let index = 0; index < values.length; index++) {
            let element = values[index];

            if (element.Key === lang && element.Value &&
                element.Value.length > 0) {
                result = element.Value;
                break;
            }
        }

        if (!result && values.length) {
            result = values[0].Value;
        }

        return result;

    };

    static orderBy(value: Array<any>, field: string, reverse?: boolean, isDateOffset?: boolean) {
        if (value) {
            value.sort(function (a, b) {
                let A = (a[field] instanceof String) ? a[field].toLowerCase() : a[field];
                let B = (b[field] instanceof String) ? b[field].toLowerCase() : b[field];

                if (isDateOffset) {
                    A = DateTimeOffset.fromJson(A);
                    B = DateTimeOffset.fromJson(B);
                    let result = (A as DateTimeOffset).Date.getTime() - (B as DateTimeOffset).Date.getTime();
                    if (result != 0) {
                        result = reverse === true ? result * - 1 : result
                    }

                    return result

                } else {

                    if (A < B) {
                        return reverse === true ? 1 : -1;
                    } else if (A > B) {
                        return reverse === true ? -1 : 1;
                    } else {
                        return 0;
                    }
                }
            });

        }

        return value;
    }

    public static getSettingValueByKey(entity: any, key: string) {

        let result = undefined;
        if (entity && entity.Settings) {

            for (var i = 0; i < entity.Settings.length; i++) {
                if (entity.Settings[i].Key === key) {
                    result = entity.Settings[i].Value;
                    break;
                }
            }
        }

        return result;
    }

    public static setSettingsValue(entity, setting: IKeyValue) {

        if (!entity) {
            return
        }

        if (!entity.Settings) {
            entity.Settings = [];
        }

        if (setting && setting.Key) {

            let founded = (entity.Settings as Array<IKeyValue>).find(x => x.Key == setting.Key);

            //var s = this.getSettingValueByKey(entity, setting.Key);
            //if (setting.Value instanceof Object) {
            //setting.Value = JSON.stringify(setting.Value)
            //}
            if (founded) {
                founded.Value = setting.Value;
            }
            else {
                entity.Settings.push(setting);
            }
        }
    };

}
