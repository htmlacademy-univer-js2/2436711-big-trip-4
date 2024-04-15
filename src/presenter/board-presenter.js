import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

import { POINT_COUNT } from '../const.js';

import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor(container, destinationsModel, offersModel, pointsModel) {
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.get()];
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    render(new PointEditView(this.points[POINT_COUNT - 1],
      this.destinationsModel.getById(this.points[POINT_COUNT - 1].destination),
      this.offersModel.getByType(this.points[POINT_COUNT - 1].type)), this.eventListComponent.getElement());

    for (let i = 0; i < this.points.length - 1; i++) {
      render(new PointView(this.points[i],
        this.destinationsModel.getById(this.points[i].destination),
        this.offersModel.getByType(this.points[i].type)), this.eventListComponent.getElement());
    }
  }
}
