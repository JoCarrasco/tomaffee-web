import { DateHelperCore, TDateObject } from '../../../../core';

class MockDateHelperCore extends DateHelperCore {
  public static getTz(): string {
    return this.getBrowserTimezone();
  }

  public static getDateObj(date: Date): TDateObject {
    return this.getDateObject(date);
  }
}

describe('DateHelper Core Class Test', () => {
  it('getDateObject() should return a proper lib object with correct date', () => {
    const newDate = new Date();
    const objDate = MockDateHelperCore.getDateObj(newDate);
    expect(objDate.toDate()).toStrictEqual(newDate);
    expect(objDate).toHaveProperty('date');
    expect(objDate).toHaveProperty('month');
    expect(objDate).toHaveProperty('year');
    expect(objDate).toHaveProperty('hour');
    expect(objDate).toHaveProperty('minute');
    expect(objDate).toHaveProperty('second');
    expect(objDate).toHaveProperty('day');
    expect(objDate.date()).toEqual(newDate.getDate());
    expect(objDate.month()).toEqual(newDate.getMonth());
    expect(objDate.year()).toEqual(newDate.getFullYear());
    expect(objDate.hour()).toEqual(newDate.getHours());
    expect(objDate.minute()).toEqual(newDate.getMinutes());
    expect(objDate.second()).toEqual(newDate.getSeconds());
    expect(objDate.millisecond()).toEqual(newDate.getMilliseconds());
    expect(objDate.day()).toEqual(newDate.getDay());
  })
});
