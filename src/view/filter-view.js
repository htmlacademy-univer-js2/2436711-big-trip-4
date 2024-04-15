import { createFilterTemplate } from '../template/filter-template.js';
import { createElement } from '../render.js';

export default class FilterView {
  getTemplate = () => createFilterTemplate();

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
