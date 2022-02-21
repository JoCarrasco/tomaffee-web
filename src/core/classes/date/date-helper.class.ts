import { CoreDateHelper } from "./date-helper.class.core";
import { DateHelperFormat } from "./date-helper.class.enums";
import { IDateHelperDateOutput, TDateObject, IDateHelperSimpleTimeObj } from "./date-helper.class.models";

export class DateHelper extends CoreDateHelper {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    return this.getDateObject(date).format(DateHelperFormat.SimpleTime);
  }

  static toDurationAsClock(a: Date, b?: Date): string {
    const dateA = this.getDateObject(a);
    const dateB = b !== undefined ? this.getDateObject(b) : this.getNow().asObject;
    const d = this.lib.duration(dateB.diff(dateA));
    return d.format('HH:mm:ss');
  }

  private static toTwoDigits(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  static toFriendlyDate(date: Date): string {
    return this.getDateObject(date).toString();
  }

  static getNow(): IDateHelperDateOutput { 
    const now: TDateObject = this.lib(new Date()).tz(this.getBrowserTimezone());
    return { asDate: now.toDate(), asObject: now };
  }

  static getLastDaysDates(numberOfDays: number): Date[] {
    let dates: Date[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      dates.push((this.getNow().asObject).subtract(i, 'day').toDate());
    }

    return dates.sort((a, b) => b.getTime() - a.getTime());
  }

  static isSameDay(d1: Date, d2: Date): boolean {
    return this.getDateObject(d1).isSame(this.getDateObject(d2), 'date');
  }

  static assignDate(timeAsDate: Date | IDateHelperSimpleTimeObj, date: Date): Date {
    const obj = timeAsDate instanceof Date ? this.toTimeObject(timeAsDate) : timeAsDate;
    return this.lib((({ ...obj, ...this.toDateObject(date) } as unknown) as string)).toDate();
  }
}
