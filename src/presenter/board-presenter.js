import PointListView from '../view/point-list-view';
import {FILTER_DATA_DETECTION, FILTER_TYPES, SORT_TYPE, UPDATE_TYPE, USER_ACTION} from '../const';
import NewPointPresenter from './new-point-presenter';
import {remove, render} from '../framework/render';
import EmptyPointView from '../view/empty-point-view';
import SortView from '../view/sort-view';
import PointPresenter from './point-presenter';
import {sortDay, sortPrice, sortTime} from '../utils';
import LoadingView from '../view/loading-view';

export default class BoardPresenter {
  #container = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #pointsListComponent = new PointListView();
  #sortComponent = null;
  #noPointComponent = null;
  #newPointButtonComponent = null;
  #loadingComponent = new LoadingView();

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #sortType = SORT_TYPE.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;

  #creatingNewPoint = false;
  #isLoading = true;

  constructor({ container, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy, newPointButtonComponent }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newPointButtonComponent = newPointButtonComponent;

    this.#newPointPresenter = new NewPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      pointListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: () => {
        this.#creatingNewPoint = false;
        onNewPointDestroy();
      }
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  rerender() {
    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    this.#sortType = SORT_TYPE.DAY;
    this.#renderBoard();
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.#creatingNewPoint) {
      if (!this.points.length) {
        this.#renderEmptyList();
        return;
      }
    }

    this.#renderSort();
    this.#renderList(this.points);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#sortType = SORT_TYPE.DAY;
    }
  }

  createPoint() {
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      render(this.#pointsListComponent, this.#container);
    }
    this.#creatingNewPoint = true;
    this.#sortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }

    this.#sortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEmptyList() {
    this.#noPointComponent = new EmptyPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#container);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: this.#sortType
    });
    render(this.#sortComponent, this.#container);
  }

  #renderList(points) {
    render(this.#pointsListComponent, this.#container);

    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = FILTER_DATA_DETECTION[this.#filterType](points);

    switch (this.#sortType) {
      case SORT_TYPE.DAY:
        return filteredPoints.sort(sortDay);
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPrice);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortTime);
    }

    return filteredPoints;
  }
}
