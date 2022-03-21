import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { IDateHelperSimpleDateObj, IDateHelperSimpleTimeObj, TDateObject } from './date-helper.class.models';
import { DateHelperFormat } from './date-helper.class.enums';

dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export class DateHelperCore {
  protected static getDateObject(date: Date): TDateObject {
    return this.lib(date.toISOString());
  }

  protected static toDateObject(date: Date): IDateHelperSimpleDateObj {
    const obj = this.getDateObject(date);
    return { day: obj.day(), month: obj.month(), year: obj.year() };
  }

  protected static toTimeObject(date: Date): IDateHelperSimpleTimeObj {
    const obj = this.getDateObject(date);
    return { hour: obj.hour(), minute: obj.minute(), second: obj.second() };
  }

  protected static getBrowserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static readonly lib = dayjs;

  static formats = DateHelperFormat;
}
