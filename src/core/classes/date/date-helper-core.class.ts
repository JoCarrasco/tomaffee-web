import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { IDateHelperSimpleDateObj, IDateHelperSimpleTimeObj, TDateObject } from './date-helper.models';
import { DateHelperFormat } from './date-helper.enums';

dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(isBetween);

export class DateHelperCore {
  protected static readonly lib = dayjs;
  
  protected static getDateObject(date: Date): TDateObject {
    return this.lib(date.toISOString());
  }

  protected static toTimeObject(date: Date): IDateHelperSimpleTimeObj {
    const obj = this.getDateObject(date);
    return { hour: obj.hour(), minute: obj.minute(), second: obj.second() };
  }
  
  protected static getBrowserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  
  static toSimpleDateObject(date: Date): IDateHelperSimpleDateObj {
    const obj = this.getDateObject(date);
    return { date: obj.date(), month: obj.month(), year: obj.year() };
  }

  static formats = DateHelperFormat;
}
