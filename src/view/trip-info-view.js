import { createTripInfoTemplate } from '../template/trip-info-template.js';
import { createElement } from '../render.js';

export default class TripInfoView {
  constructor(destinationsModel, points) {
    this.points = points;
    this.destinationsModel = destinationsModel;
  }

  getTemplate = () => {
    const destinations = [];

    for (let i = 0; i < this.points.length; i++) {
      destinations.push(this.destinationsModel.getById(this.points[i].destination));
    }

    return createTripInfoTemplate(destinations);
  };

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
