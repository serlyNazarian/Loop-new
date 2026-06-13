import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DATE_FORMAT = 'MMM D, YYYY';
const DATE_TIME_FORMAT = 'MMM D, YYYY · h:mm A';
const TIME_FORMAT = 'h:mm A';
const MONTH_YEAR_FORMAT = 'MMMM YYYY';
const EMPTY = '—';

const toDayjs = (value, format) => {
  if (dayjs.isDayjs(value)) return value;
  if (format) return dayjs(value, format);
  if (value == null || value === '') return dayjs();
  return dayjs(value);
};

const UtilDate = {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
  MONTH_YEAR_FORMAT,

  toDayjs,

  formatDate: (value, format = DATE_FORMAT) =>
    value ? toDayjs(value).format(format) : EMPTY,
  formatDateTime: (value, format = DATE_TIME_FORMAT) =>
    value ? toDayjs(value).format(format) : EMPTY,
  formatTime: (value, format = TIME_FORMAT) =>
    value ? toDayjs(value).format(format) : EMPTY,
  formatMonthYear: (value) =>
    value ? toDayjs(value).format(MONTH_YEAR_FORMAT) : EMPTY,

  now: () => dayjs(),
  thisMonth: () => dayjs().month(),
  thisYear: () => dayjs().year(),

  addDays: (value, count = 1) => toDayjs(value).add(count, 'day'),
  subDays: (value, count = 1) => toDayjs(value).subtract(count, 'day'),
  nextMonth: (value) => toDayjs(value).add(1, 'month'),
  prevMonth: (value) => toDayjs(value).subtract(1, 'month'),

  startOfDay: (value) => toDayjs(value).startOf('day'),
  endOfDay: (value) => toDayjs(value).endOf('day'),
  startOfMonth: (value) => toDayjs(value).startOf('month'),
  endOfMonth: (value) => toDayjs(value).endOf('month'),
  startOfWeek: (value) => toDayjs(value).startOf('week'),
  endOfWeek: (value) => toDayjs(value).endOf('week'),

  daysInMonth: (value) => toDayjs(value).daysInMonth(),
  diffInDays: (a, b) => toDayjs(a).diff(toDayjs(b), 'day'),
  isSameDay: (a, b) => toDayjs(a).isSame(toDayjs(b), 'day'),
  isToday: (value) => toDayjs(value).isSame(dayjs(), 'day'),
  isAfter: (a, b) => toDayjs(a).isAfter(toDayjs(b)),
  isBefore: (a, b) => toDayjs(a).isBefore(toDayjs(b)),
};

export default UtilDate;
