import AbstractView from '../framework/view/abstract-view';
import createInfoTemplate from '../template/info-template';

export default class InfoView extends AbstractView {
  #info = null;

  constructor({ info }) {
    super();
    this.#info = info;
  }

  get template() {
    return createInfoTemplate(this.#info);
  }
}
