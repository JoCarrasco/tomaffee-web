import { DateHelperCore } from "./date-helper-core.class";
import { DateHelperFormat } from "./date-helper.enums";
import { IDateHelperDateOutput, TDateObject, IDateHelperSimpleTimeObj } from "./date-helper.models";

export class DateHelper extends DateHelperCore {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    return this.getDateObject(date).format(DateHelperFormat.SimpleTime);
  }

  static toDurationAsClock(a: Date, b?: Date): string {
    const dateA = this.getDateObject(a);
    const dateB = b !== undefined ? this.getDateObject(b) : this.getNow().asObject;
    const d = this.lib.duration(dateB.diff(dateA));
    return d.format(DateHelperFormat.SimpleTime);
  }

  static toFriendlyDate(date: Date): string {
    return this.getDateObject(date).toString();
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