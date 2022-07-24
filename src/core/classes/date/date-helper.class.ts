import { DateHelperCore } from "./date-helper-core.class";
import { DateHelperFormat } from "./date-helper.enums";
import { IDateHelperDateOutput, TDateObject, IDateHelperSimpleTimeObj } from "./date-helper.models";

export class DateHelper extends DateHelperCore {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    return this.getDateObject(date).format(this.formats.SimpleTime);
  }

  static toDurationAsClock(a: Date, b?: Date): string {
    const dateA = this.getDateObject(a);
    const dateB = b !== undefined ? this.getDateObject(b) : this.getNow().asObject;
    const d = this.lib.duration(dateB.diff(dateA));
    return d.format(this.formats.SimpleTime);
  }

  static isBetween(target: Date, start: Date, end: Date): boolean {
    return this.lib(target).isBetween(start, end);
  }

  static toFriendlyDate(date: Date): string {
    return this.getDateObject(date).toString();
  }

  static toHourMinute12HourClock(date: Date) {
    return this.getDateObject(date).format(DateHelperFormat.TwelveHourClockHourMinute);
  }

  static assignTimeToDate(date: Date, timeStr: string): Date {
    const timeAsArr = this.convert12HourTo24Hour(timeStr).split(':');
    const cloneDate = new Date(date.getTime());
    cloneDate.setHours(parseInt(timeAsArr[0]));
    cloneDate.setMinutes(parseInt(timeAsArr[1]));
    return date;
  }

  static convert12HourTo24Hour(timeStr: string): string {
    const timeAsArr = timeStr.split(':');
    let hourAsString = timeAsArr[0];

    if (timeStr.includes('PM')) {
      let hour = parseInt(timeAsArr[0], 10);
      hour = hour !== 12 ? hour + 12 : 0;
      hourAsString = hour < 10 ? `0${hour}` : hour.toString();
    }

    timeAsArr[0] = hourAsString;
    timeAsArr[1] = timeAsArr[1].slice(0, 2);
    return timeAsArr.join(':');
  }

  static getNow(): IDateHelperDateOutput {
    const now: TDateObject = this.lib(new Date()).tz(this.getBrowserTimezone());
    return { asDate: now.toDate(), asObject: now };
  }

  static getLastDaysDates(numberOfDays: number): Date[] {
    const dates: Date[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      dates.push((this.getNow().asObject).subtract(i, 'day').toDate());
    }

    return dates.sort((a, b) => b.getTime() - a.getTime());
  }

  static isSameDay(d1: Date, d2: Date): boolean {
    return this.getDateObject(d1).isSame(this.getDateObject(d2), 'date');
  }

  static assignDate(timeObj: Partial<IDateHelperSimpleTimeObj>, date: Date): Date {
    if (timeObj.hour !== undefined) {date.setHours(timeObj.hour)}
    if (timeObj.minute !== undefined) { date.setMinutes(timeObj.minute) }
    if (timeObj.second !== undefined) {date.setSeconds(timeObj.second) }
    return date;
  }
}
