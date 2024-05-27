import {render} from '../framework/render';

export default class NewPointButtonPresenter {
  #container = null;
  #component = null;

  constructor({container, component}) {
    this.#container = container;
    this.#component = component;
  }

  init() {
    render(this.#component, this.#container);
  }
}
