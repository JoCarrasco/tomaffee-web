import { DateHelper } from './date-helper.class';
import { DateHelperFormat } from './date-helper.class.enums';

const dateA = new Date('03/05/1999');
const dateAHourVariant = new Date('03/05/1999');
dateAHourVariant.setHours(3);
const dateAHourVarianStringFormat = '03:00:00';
const dateB = new Date('03/05/1999');
const dateC = new Date('10/04/2015');
const dateAStringFormat = 'Fri, 05 Mar 1999 04:00:00 GMT';

describe('DateHelper Test', () => {
  it('getNow method should return a very accurate(300ms variation) of current date', () => {
    const nativeNowDate = new Date();
    const instanceDateHelperNow = DateHelper.getNow();
    const targetNowDate = DateHelper.getNow().asDate;
    const diff = nativeNowDate.getTime() - targetNowDate.getTime();
    expect(diff).toBeLessThan(300);
    expect(diff).toBeGreaterThan(-300);
    expect(instanceDateHelperNow.asDate).toBeInstanceOf(Date);
    expect(instanceDateHelperNow.asObject).toBeInstanceOf(Object);
  });

  it('isSameDay should compare 2 dates and tell if they are on the same day', () => {
    expect(DateHelper.isSameDay(dateA, dateB)).toBeTruthy();
    expect(DateHelper.isSameDay(dateA, dateC)).toBeFalsy();
  });

  it('getLastDaysDates should compare return a determined amount of dates', () => {
    const numberOfDates = 12;
    const dates = DateHelper.getLastDaysDates(numberOfDates);
    expect(dates.length).toBe(numberOfDates);
  });

  it('toFriendlyDate should return correct string format', () => {
    expect(DateHelper.toFriendlyDate(dateA)).toBe(dateAStringFormat);
  });

  it(`getDuration should return correct duration in a ${DateHelperFormat.SimpleTime} format`, () => {
    expect(DateHelper.toDurationAsClock(dateA, dateAHourVariant)).toBe(dateAHourVarianStringFormat);
  });
});
