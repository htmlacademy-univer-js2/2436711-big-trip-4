import { createFilterTemplate } from '../template/filter-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filter = false;

  constructor(activeFilter) {
    super();
    this.#filter = activeFilter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
