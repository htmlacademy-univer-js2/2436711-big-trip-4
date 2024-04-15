import { createTripInfoTemplate } from '../template/trip-info-template.js';
import { createElement } from '../render.js';

export default class TripInfoView {
  getTemplate = () => createTripInfoTemplate();

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
