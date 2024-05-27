import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const DAY_IN_YEAR = 365;
const MIN_IN_DAY = MIN_IN_HOUR * HOUR_IN_DAY;
const MIN_IN_YEAR = MIN_IN_DAY * DAY_IN_YEAR;

function shortDate(date) {
  return date ? dayjs(date).format('MMM DD') : '';
}

function humanizeHHmm(date) {
  return date ? dayjs(date).format('HH:mm') : '';
}

function getDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (timeDiff >= MIN_IN_YEAR) {
    return dayjs.duration(timeDiff, 'minutes').format('YY[Y] DD[D] HH[H] mm[M]');
  } else if (timeDiff >= MIN_IN_DAY) {
    return dayjs.duration(timeDiff, 'minutes').format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= MIN_IN_HOUR) {
    return dayjs.duration(timeDiff, 'minutes').format('HH[H] mm[M]');
  } else {
    return dayjs.duration(timeDiff, 'minutes').format('mm[M]');
  }
}

function getLastWord(string) {
  const words = string.split(' ');
  return words.at(-1);
}

function camelizer(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isFutureDate(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isPastDate(dateTo) {
  return dayjs(dateTo).isBefore(dayjs());
}

function isPresentDate(dateFrom, dateTo) {
  const now = dayjs();
  return now.isSameOrAfter(dateFrom) && now.isSameOrBefore(dateTo);
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
}

function sortDay(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortTime(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  const durationA = dayjs.duration(dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'minute'));
  const durationB = dayjs.duration(dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'minute'));

  if (weight !== null) {
    return weight;
  } else {
    if (durationA.asMilliseconds() > durationB.asMilliseconds()) {
      return -1;
    } else if (durationA.asMilliseconds() < durationB.asMilliseconds()) {
      return 1;
    } else {
      return 0;
    }
  }
}

function sortPrice(pointA, pointB) {
  const diff = pointA.basePrice - pointB.basePrice;
  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
  } else {
    return 0;
  }
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isPriceEqual(priceA, priceB) {
  return priceA === priceB;
}

function getInfoFromPoints({ points, destinations, offers }) {
  if (!points || !destinations || !offers) {
    return {
      destinationsString: '',
      datesString: '',
      total: 0
    };
  }
  const sortedPoints = [...points.sort(sortDay)];
  const arrayOfDestinations = [];
  let sumOfTrip = 0;
  sortedPoints.forEach((point) => {
    const destination = destinations.find((dest) => dest.id === point.destination).name;
    arrayOfDestinations.push(destination);
    const offersOfCurrentType = offers.find((offer) => offer.type === point.type).offers;
    offersOfCurrentType.forEach((offer) => {
      if (point.offers.includes(offer.id)) {
        sumOfTrip += offer.price;
      }
    });
    sumOfTrip += point.basePrice;
  });

  return {
    destinationsString: createViewOfPath(arrayOfDestinations),
    datesString: createViewOfDates(sortedPoints[0]?.dateFrom, sortedPoints[sortedPoints.length - 1]?.dateTo),
    total: sumOfTrip
  };
}

function createViewOfPath(destinations) {
  let string = '';
  if (destinations.length < 4) {
    destinations.forEach((destination, index) => {
      if (index !== destinations.length - 1) {
        string += `${destination} &mdash; `;
      } else {
        string += `${destination}`;
      }
    });
  } else {
    string = `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
  }
  return string;
}

function createViewOfDates(dateA, dateB) {
  return dateA && dateB ? `${dayjs(dateA).format('D MMM').toUpperCase()}&nbsp;&mdash;&nbsp;${dayjs(dateB).format('D MMM').toUpperCase()}` : '';
}

export { getInfoFromPoints, isDatesEqual, isPriceEqual, sortDay, sortTime, sortPrice, getDuration,
  shortDate, humanizeHHmm, getLastWord, camelizer, isFutureDate, isPastDate, isPresentDate };
