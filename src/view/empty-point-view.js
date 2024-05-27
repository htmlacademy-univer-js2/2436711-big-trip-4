import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../const.js';

const NoPointsTextType = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
  [FILTER_TYPES.PAST]: 'There are no past events now',
  [FILTER_TYPES.PRESENT]: 'There are no present events now',
};

function createTripInfoTemplate(filterType) {
  return `<p class="trip-events__msg">${NoPointsTextType[filterType]}</p>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripInfoTemplate(this.#filterType);
  }
}
