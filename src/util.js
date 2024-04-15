import { Duration, DateFormat, MS_IN_HOUR, MS_IN_DAY} from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const getRandomInt = (a, b) => Math.floor(a + Math.random() * (b - a + 1));

const getRandomElement = (items) => items[getRandomInt(0, items.length - 1)];

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

const formatToDateTime = (dueDate) => dueDate ? dayjs(dueDate).format(DateFormat.LONG) : '';

const formatToShortDate = (time) => time ? dayjs(time).format(DateFormat.SHORT) : '';

const formatToShortTime = (time) => time ? dayjs(time).format('HH:mm') : '';

const getDate = (add) => {
  let date = dayjs().subtract(getRandomInt(0, Duration.DAY), 'day').toDate();

  const mins = getRandomInt(0, Duration.MIN);
  const hours = getRandomInt(0, Duration.HOUR);
  const days = getRandomInt(0, Duration.DAY);

  if (add) {
    date = dayjs(date)
      .add(mins, 'minute')
      .add(hours, 'hour')
      .add(days, 'days')
      .toDate();
  }

  return date;
};

const getDuration = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDifference >= MS_IN_DAY) {
    return dayjs.duration(timeDifference).format('DD[D] HH[H] mm[M]');
  } else if (timeDifference >= MS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('HH[H] mm[M]');
  } else if (timeDifference < MS_IN_HOUR) {
    return dayjs.duration(timeDifference).format('mm[M]');
  }
};

export { getRandomInt, getRandomElement, humanizeTaskDueDate, formatToDateTime, formatToShortDate, formatToShortTime, getDate, getDuration };
