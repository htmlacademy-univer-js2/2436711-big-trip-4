import { createPointEditTemplate } from '../template/point-edit-template.js';
import { createElement } from '../render.js';

export default class PointEditView {
  getTemplate = () => createPointEditTemplate();

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
