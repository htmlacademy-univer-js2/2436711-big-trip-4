import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render, replace } from '../framework/render.js';

export default class TripPresenter {
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  constructor(container, destinationsModel, offersModel, pointsModel) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.get()];
  }

  init() {
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(
      point,
      this.#destinationsModel.getById(point.destination),
      this.#offersModel.getByType(point.type),
      pointEditHandler);

    const pointEditComponent = new PointEditView(
      point,
      this.#destinationsModel.getById(point.destination),
      this.#offersModel.getByType(point.type),
      submitHandler,
      closeButtonClickHandler);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const escHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escHandler);
      }
    };

    function submitHandler(evt) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escHandler);
    }

    function closeButtonClickHandler(evt) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escHandler);
    }

    function pointEditHandler(evt) {
      evt.preventDefault();
      replacePointToForm();
      document.addEventListener('keydown', escHandler);
    }

    render(pointComponent, this.#eventListComponent.element);
  };
}
