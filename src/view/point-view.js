import { createPointTemplate } from '../template/point-template.js';
import { createElement } from '../render.js';

export default class PointView {
  constructor(point, pointDestination, pointOffers) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate = () => createPointTemplate(this.point, this.pointDestination, this.pointOffers);

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
