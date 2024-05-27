import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FILTER_TYPES, UPDATE_TYPE } from '../const.js';
import { FILTER_DATA_DETECTION } from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({ container, filterModel, pointsModel }) {
    this.#filterContainer = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#filterComponent = null;

    this.#pointsModel.addObserver(this.handleModelEvent);
    this.#filterModel.addObserver(this.handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;
    return Object.values(FILTER_TYPES).map((type) => ({type, isDisabled: !FILTER_DATA_DETECTION[type](points).length})
    );
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
    } else {
      replace(this.#filterComponent, prevFilterComponent);
      remove(prevFilterComponent);
    }
  }

  handleModelEvent = () => {
    this.init();
  };

  handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
