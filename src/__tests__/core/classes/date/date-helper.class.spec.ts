import { DateHelperCore, DateHelper, DEFAULT_TIME_REGEX } from '../../../../core';
import { DEFAULT_MOCK_DATES as mock } from '../../../../mocks';

describe('DateHelper Util Class Test', () => {
  it('parseToStrOfHoursAndMinutes should return a string if date is correct', () => {
    const parsedDate: string = DateHelper.parseToStrOfHoursAndMinutes(mock.dateA);
    expect(parsedDate).toMatch(DEFAULT_TIME_REGEX);
    expect(typeof parsedDate).toBe('string');
  });

  it('toDurationAsClock should return a string with duration if two dates is correct', () => {
    const dateVariant = new Date(mock.dateA);
    dateVariant.setHours(mock.hoursToBeDiff);
    const rangeDuration: string = DateHelper.toDurationAsClock(mock.dateA, dateVariant);
    const hoursDiff: string = rangeDuration.slice(0, 2);
    const pastDuration: string = DateHelper.toDurationAsClock(new Date());
    const hoursDiffInNumber = parseInt(hoursDiff, 10);
    expect(pastDuration).toMatch(DEFAULT_TIME_REGEX);
    expect(rangeDuration).toMatch(DEFAULT_TIME_REGEX);
    expect(pastDuration).not.toBe('');
    expect(rangeDuration).not.toBe('');
    expect(hoursDiffInNumber).toEqual(mock.hoursToBeDiff);
  });

  it('toFriendlyDate should return correct string format', () => {
    const date = DateHelper.toFriendlyDate(mock.dateA);
    expect(typeof date).toBe('string');
    expect(date).not.toBe('');
    expect(date).toBe(mock.dateAStringFormat);
  });

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
    expect(DateHelper.isSameDay(mock.dateA, mock.dateA)).toBeTruthy();
    expect(DateHelper.isSameDay(mock.dateA, mock.dateB)).toBeFalsy();
  });

  it('getLastDaysDates should compare return a determined amount of dates', () => {
    const numberOfDates = 3;
    const todayInNumber = DateHelper.getNow().asObject.date();
    const dates: Date[] = DateHelper.getLastDaysDates(numberOfDates);
    expect(dates.length).toBe(numberOfDates);

    const parsedDates = dates.map((date) => DateHelperCore.lib(date));
    const datesInNumbers = parsedDates.map((date) => { return { day: date.date() } });
    expect(datesInNumbers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ day: todayInNumber }),
        expect.objectContaining({ day: todayInNumber - 1 }),
        expect.objectContaining({ day: todayInNumber - 2 }),
      ])
    );
  });

  it('assignDate should compare 2 dates and tell if they are on the same day', () => {
    const now = DateHelper.getNow();
    const newDate = DateHelper.assignDate({ hour: now.asObject.hour() }, mock.dateA);
    expect(newDate.getHours()).toEqual(now.asDate.getHours());
  });
});
