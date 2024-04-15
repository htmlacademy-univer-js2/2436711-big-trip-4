import { createPointEditTemplate } from '../template/point-edit-template.js';
import { EMPTY_POINT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onSubmit = null;
  #onCloseButtonClick = null;

  constructor(point = EMPTY_POINT, pointDestination, pointOffers, onSubmit, onCloseButtonClick) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onSubmit = onSubmit;
    this.#onCloseButtonClick = onCloseButtonClick;

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCloseButtonClick);
    this.element.querySelector('form').addEventListener('submit', this.#onSubmit);
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }
}
