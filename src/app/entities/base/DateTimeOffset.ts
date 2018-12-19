
export class DateTimeOffset {
    DateTime: string;
    OffsetMinutes: number;
    Date: Date;

    static dateFromJson(val: string) {
        if (!val) {
            return null;
        }

        var matched = val.match(/\/Date\(([0-9]+)(?:.*)\)\//);

        if (matched && matched[1]) {
            let result = new Date(parseInt(matched[1]));
            result.setTime(result.getTime() + result.getTimezoneOffset() * 60 * 1000);
            return result;
        }
        return null;
    }

    static fromJson(val: DateTimeOffset, addSeconds?: number): DateTimeOffset {
        var matched = val.DateTime.match(/\/Date\(([0-9]+)(?:.*)\)\//);
        let result = val;

        if (matched && matched[1]) {
            let date = new Date(parseInt(matched[1]));

            if (addSeconds && addSeconds != 0) {
                date.setSeconds(date.getSeconds() + addSeconds);
            }
            result.Date = date;
        }

        return result;
    }



    constructor(value?: Date) {
        if (value) {
            this.Date = value;
            this.DateTime = "/Date(" + value.getTime() + ")/";
            this.OffsetMinutes = value.getTimezoneOffset();
        }
    }
}

