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

const SORT_TYPE = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE',
  ADD_POINT: 'ADD',
  DELETE_POINT: 'DELETE',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EDITING_TYPE = {
  UPDATE: 'UPDATE',
  NEW: 'NEW'
};

export { DESTINATIONS, POINT_TYPES, FILTER_TYPES, FILTER_DATA_DETECTION, USER_ACTION, EDITING_TYPE, UPDATE_TYPE, SORT_TYPE };
