import AbstractView from '../framework/view/abstract-view.js';
import createTripInfoTemplate from '../template/trip-info-template';

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
