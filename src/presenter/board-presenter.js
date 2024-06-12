import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import EmptyPointView from '../view/empty-point-view';
import SortView from '../view/sort-view';
import LoadingView from '../view/loading-view';
import {remove, render, RenderPosition} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {FILTER_DATA_DETECTION, FILTER_TYPES, SORT_TYPE, UPDATE_TYPE, USER_ACTION, TIME_LIMIT} from '../const';
import {sortDay, sortPrice, sortTime} from '../utils';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #pointsListComponent = null;
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #sortType = SORT_TYPE.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #onNewPointDestroy = null;
  #creatingNewPoint = false;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMIT.LOWER_LIMIT,
    upperLimit: TIME_LIMIT.UPPER_LIMIT
  });

  constructor({ container, pointsModel, destinationsModel, offersModel,
    filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsListComponent = container.querySelector('.trip-events__list');
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#newPointPresenter = new NewPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      pointListContainer: this.#pointsListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #newPointDestroyHandler = ({ isCanceled }) => {
    this.#creatingNewPoint = false;
    this.#onNewPointDestroy();

    if (!this.points.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  init() {
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
    }

    this.#creatingNewPoint = true;
    this.#sortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case USER_ACTION.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderList(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent,
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
