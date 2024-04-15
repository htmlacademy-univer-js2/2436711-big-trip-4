import { createTripInfoTemplate } from '../template/trip-info-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinationsModel = null;

  constructor(destinationsModel, points) {
    super();
    this.#points = points;
    this.#destinationsModel = destinationsModel;
  }

  get template() {
    const destinations = [];
    for (let i = 0; i < this.#points.length; i++) {
      destinations.push(this.#destinationsModel.getById(this.#points[i].destination));
    }

    return createTripInfoTemplate(destinations);
  }
}
