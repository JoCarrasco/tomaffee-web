import { CoreDateHelper, DateLib } from "./lib";
import { IDateHelperDateOutput, IDateHelperSimpleTimeObj } from "./models";
import { DateHelperFormat, DateHelperError } from "./static";
import { TDateObject } from "./types";

export class DateHelper extends CoreDateHelper {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    return this.getDateObject(date).format(DateHelperFormat.SimpleTime);
  }

  static getDuration(a: Date, b?: Date): string {
    const dateA = this.getDateObject(a);
    const dateB = b !== undefined ? this.getDateObject(b) : this.getNow().asObject;
    const { hours, minutes, seconds } = DateLib.duration(dateB.diff(dateA));
    return `${hours()}: ${minutes()}: ${Math.floor(seconds() || 0)}`;
  }

  static toFriendlyDate(date: Date): string {
    return this.getDateObject(date).toString() || DateHelperError.DateInvalid;
  }

  static getNow(): IDateHelperDateOutput { 
    const now: TDateObject = DateLib(new Date()).tz(this.getBrowserTimezone());
    return { asDate: now.toDate(), asObject: now };
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

  static assignDate(timeAsDate: Date | IDateHelperSimpleTimeObj, date: Date): Date {
    const obj = timeAsDate instanceof Date ? this.toTimeObject(timeAsDate) : timeAsDate;
    return DateLib((({ ...obj, ...this.toDateObject(date) } as unknown) as string)).toDate();
  }
}
