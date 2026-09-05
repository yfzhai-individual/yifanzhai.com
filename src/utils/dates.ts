const calendarDateFormats = {
  long: new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  short: new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  monthYear: new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }),
} as const;

export type CalendarDateFormat = keyof typeof calendarDateFormats;

export function formatCalendarDate(date: Date, format: CalendarDateFormat = 'long') {
  return calendarDateFormats[format].format(date);
}

export function toCalendarDateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function compareDatesDescending(left: Date, right: Date) {
  return right.valueOf() - left.valueOf();
}
