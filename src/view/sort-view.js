import { createSortTemplate } from '../template/sort-template.js';
import { createElement } from '../render.js';

export default class SortView {
  getTemplate = () => createSortTemplate();

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
