import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

type DateObject = dayjs.Dayjs;
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

enum DateHelperFormat {
  SimpleTime = 'HH:mm:ss'
}

export class DateHelper {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    return this.getDateObject(date).format(DateHelperFormat.SimpleTime);
  }

  static getDuration(a: Date, b?: Date): string {
    const dateA = this.getDateObject(a);
    const dateB = b !== undefined ? this.getDateObject(b) : this.getNow().asObject;
    const { hours, minutes, seconds } = dayjs.duration(dateB.diff(dateA));
    return `${hours()}: ${minutes()}: ${Math.floor(seconds() || 0)}`;
  }

  static toFriendlyDate(date: Date): string {
    return this.getDateObject(date).toString() || 'ERROR DATE_INVALID';
  }

  static getDurationFromStartAndEnd(start: Date, end?: Date): string {
    return this.getDuration(start, end);
  }

  static getBrowserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static getNow(): { asDate: Date, asObject: DateObject }  { 
    const now = dayjs(new Date()).tz(this.getBrowserTimezone());
    return { asDate: now.toDate(), asObject: now };
  }

  static toDateObject(date: Date): { day: number; month: number; year: number } {
    const { day, month, year } = this.getDateObject(date);
    return { day: day(), month: month(), year: year() };
  }

  static toTimeObject(date: Date): { hour: number; minute: number; second: number } {
    const { hour, minute, second } = this.getDateObject(date);
    return { hour: hour(), minute: minute(), second: second() };
  }

  static modifyTimeInDate(hour: number, minute: number, second: number, date: Date): Date {
    const obj: unknown = { ...{ hour, minute, second }, ...this.toDateObject(date) };
    return dayjs(obj as string).toDate();
  }

  static getLastDaysDates(numberOfDays: number): Date[] {
    let dates: Date[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      dates.push((this.getNow().asObject).subtract(1, 'day').toDate());
    }

    return dates.sort((a, b) => b.getTime() - a.getTime());
  }

  static isSameDay(d1: Date, d2: Date): boolean {
    return this.getDateObject(d1).isSame(this.getDateObject(d2), 'day');
  }

  static assignDate(timeDate: Date, date: Date): Date {
    return dayjs((({ ...this.toTimeObject(timeDate), ...this.toDateObject(date) } as unknown) as string)).toDate();
  }

  private static getDateObject(date: Date): DateObject {
    return dayjs(date.toISOString());
  }

  static formats = DateHelperFormat;
}
