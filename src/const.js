import {isFutureDate, isPastDate, isPresentDate} from './utils';

const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Saint Petersburg', 'Vienna'];
const POINT_TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];
const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FILTER_DATA_DETECTION = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FILTER_TYPES.PRESENT]: (points) => points.filter((point) => isPresentDate(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};

export { DESTINATIONS, POINT_TYPES, FILTER_TYPES, FILTER_DATA_DETECTION };
