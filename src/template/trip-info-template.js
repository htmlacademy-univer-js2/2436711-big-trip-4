import {NO_POINTS_TEXT_TYPE} from '../const';

export default function createTripInfoTemplate(filterType) {
  return `<p class="trip-events__msg">${NO_POINTS_TEXT_TYPE[filterType]}</p>`;
}
