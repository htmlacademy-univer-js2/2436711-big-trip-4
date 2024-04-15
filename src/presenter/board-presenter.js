import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

import { POINT_COUNT } from '../const.js';

import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    render(new PointEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}
