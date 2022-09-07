import { DateHelperCore } from "./date-helper-core.class";
import { DateHelperFormat, DateHelperFormatRegex } from "./date-helper.enums";
import { IDateHelperDateOutput, TDateObject, IDateHelperSimpleTimeObj } from "./date-helper.models";

export class DateHelper extends DateHelperCore {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    return this.getDateObject(date).format(this.formats.SimpleTime);
  }

  static toDurationAsClock(a: Date, b: Date): string {
    const dateA = this.getDateObject(a);
    const dateB = this.getDateObject(b);
    const d = this.lib.duration(dateB.diff(dateA));
    return d.format(this.formats.SimpleTime);
  }

  static isBetween(target: Date, start: Date, end: Date): boolean {
    return this.lib(target).isBetween(start, end);
  }

  static toFriendlyDate(date: Date): string {
    const obj = this.getDateObject(date);
    if (obj.isSame(this.getNow().asDate, 'day')) {
      return 'Today';
    } else {
      const yesterday = this.getNow().asObject.subtract(1, 'day')
      if (obj.isSame(yesterday, 'day')) {
        return 'Yesterday';
      }
    }

    const formated = obj.format("ddd, DD MMM");
    return formated;
  }

  static toHourMinute12HourClock(date: Date): string {
    return this.getDateObject(date).format(DateHelperFormat.TwelveHourClockHourMinute).toUpperCase();
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
    if (timeObj.hour !== undefined) { date.setHours(timeObj.hour)}
    if (timeObj.minute !== undefined) { date.setMinutes(timeObj.minute) }
    if (timeObj.second !== undefined) { date.setSeconds(timeObj.second) }
    return date;
  }

  // Note: Create unit testing for new functionality
  static assignDateTimeToDate(dateTime: Date, overrideDate: Date): Date {
    overrideDate.setHours(dateTime.getHours())
    overrideDate.setMinutes(dateTime.getMinutes())
    return overrideDate;
  }

  // Note: Create unit testing for new functionality
  static assignFullDateToDate(fullDate: Date, overrideDate: Date): Date {
    const fullDateObj = this.toSimpleDateObject(fullDate);
    overrideDate.setFullYear(fullDateObj.year, fullDateObj.month, fullDateObj.date);
    return overrideDate;
  }
  
  // Note: Create unit testing for new functionality
  static timeStrToDate(timeStr: string, overrideDate?: Date): Date {
    const isPM = timeStr.includes('PM');
    const tempTimeArr = timeStr.split(":");

    let hours = parseInt(tempTimeArr[0], 10);
    if (isPM) {
      hours += 12;
    }
    const minutes = parseInt(tempTimeArr[1].slice(0, 2), 10);
    const date = overrideDate ? overrideDate : this.getNow().asDate;
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

  // Note: Create unit testing for new functionality
  static isValidClockStr(str: string): boolean {
    const regExp = new RegExp(DateHelperFormatRegex.TwelveHourClockHourMinute);
    return regExp.test(str);
  }
}
