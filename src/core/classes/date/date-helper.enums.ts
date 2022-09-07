export enum DateHelperFormat {
  SimpleTime = 'HH:mm:ss',
  TwelveHourClockHourMinute = 'hh:mm A',
  SimpleDate = 'DD/MM/YYYY'
}

export const DateHelperFormatRegex  = {
  TwelveHourClockHourMinute: /^(?:1[0-2]|0?[0-9]):[0-5][0-9]\s?(am|AM|Am|aM|pm|PM|pM|Pm)$/
}

export enum DateHelperError {
  DateInvalid = 'ERROR DATE_INVALID',
}
