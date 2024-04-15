import { createEventListTemplate } from '../template/event-list-template.js';
import { createElement } from '../render.js';

export default class EventListView {
  getTemplate = () => createEventListTemplate();

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
