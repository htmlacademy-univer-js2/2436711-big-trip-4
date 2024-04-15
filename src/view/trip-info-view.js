import { createTripInfoTemplate } from '../template/trip-info-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor(destinations, points) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    let totalPrice = 0;
    for (let i = 0; i < this.#points.length; i++) {
      totalPrice += this.#points[i].basePrice;
    }

    return createTripInfoTemplate(this.#destinations, totalPrice);
  }
}
