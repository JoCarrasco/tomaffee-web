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

export class CoreDateHelper {
  protected static getDateObject(date: Date): TDateObject {
    return this.lib(date.toISOString());
  }

  protected static toDateObject(date: Date): IDateHelperSimpleDateObj {
    const { day, month, year } = this.getDateObject(date);
    return { day: day(), month: month(), year: year() };
  }

  protected static toTimeObject(date: Date): IDateHelperSimpleTimeObj {
    const { hour, minute, second } = this.getDateObject(date);
    return { hour: hour(), minute: minute(), second: second() };
  }

  protected static getBrowserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static readonly lib = dayjs;

  static formats = DateHelperFormat;
}
