import moment from 'moment';

export class DateHelper {
  static parseToStrOfHoursAndMinutes(date: Date): string {
    const momentDate = moment(date);
    const formatedDate = momentDate.format('h:mm:ss');
    return formatedDate;
  }

  static getHoursAndMinutesFromNow(date: Date) {
    const momentDate = moment(date);
    const momentDateNow = moment(new Date());
    const duration = moment.duration(momentDateNow.diff(momentDate));
    return `${duration.hours()}: ${duration.minutes()}: ${duration.seconds()}`;
  }

  static getDurationFromStartAndEnd(start: Date, end: Date) {
    const momentStart = moment(start);
    const momentEnd = moment(end);
    const duration = moment.duration(momentEnd.diff(momentStart));
    return `${duration.hours()}: ${duration.minutes()}: ${duration.seconds()}`;
  }
}
