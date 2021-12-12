import { DateTime } from "luxon";

export class DateHelper {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    const convertedDate = DateTime.fromISO(date.toISOString());
    return convertedDate.toFormat('HH:mm:ss');
  }

  static getDuration(a: Date, b?: Date): string {
    const dateA = DateTime.fromISO(a.toISOString());
    const dateB = b ? DateTime.fromISO(b.toISOString()) : DateTime.now().setZone(this.getBrowserTimezone());
    const duration = dateB.diff(dateA, ['hours', 'minutes', 'seconds']).toObject();
    return `${duration.hours}: ${duration.minutes}: ${Math.floor(duration.seconds!)}`;
  }

  static getDurationFromStartAndEnd(start: Date, end?: Date): string {
    return this.getDuration(start, end);
  }

  static getBrowserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static getNow() {
    const dateISOString = DateTime.now().setZone(this.getBrowserTimezone()).toISO();
    return new Date(dateISOString);
  }

  static getFullDateObjFromDate(date: Date) {
    const convertedDate = DateTime.fromISO(date.toISOString());
    return {
      day: convertedDate.day,
      month: convertedDate.month,
      year: convertedDate.year
    }
  }

  static getTimeObjFromDate(date: Date) {
    const convertedDate = DateTime.fromISO(date.toISOString());
    return {
      hour: convertedDate.hour,
      minute: convertedDate.minute,
      second: convertedDate.second
    }
  }

  static changeTimeToDate(hour: number, minute: number, second: number, date: Date) {
    const newFormattedDate = DateTime.fromObject({
      hour,
      minute,
      second,
      ...this.getFullDateObjFromDate(date)
    });

    return newFormattedDate.toJSDate();
  }

  static changeReplaceFullDateToDate(timeDate: Date, date: Date) {
    const newFormattedDate = DateTime.fromObject({
      ...this.getTimeObjFromDate(timeDate),
      ...this.getFullDateObjFromDate(date)
    });
    return newFormattedDate.toJSDate();
  }
}
