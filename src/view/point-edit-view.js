import { createPointEditTemplate } from '../template/point-edit-template.js';
import { createElement } from '../render.js';
import { EMPTY_POINT } from '../const.js';

export default class PointEditView {
  constructor(point = EMPTY_POINT, pointDestination, pointOffers) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate = () => createPointEditTemplate(this.point, this.pointDestination, this.pointOffers);

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
