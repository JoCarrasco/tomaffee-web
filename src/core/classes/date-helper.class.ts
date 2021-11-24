import { DateTime } from "luxon";

export class DateHelper {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    const momentDate = DateTime.fromISO(date.toISOString());
    const formatedDate = momentDate.toFormat('hh:mm:ss');
    return formatedDate;
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
}
