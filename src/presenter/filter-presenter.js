import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FILTER_TYPES, UPDATE_TYPE } from '../const.js';

export default class FilterPresenter {
  constructor({ container, filterModel, pointsModel }) {
    this.filterContainer = container;
    this.filterModel = filterModel;
    this.pointsModel = pointsModel;
    this.filterComponent = null;

    this.pointsModel.addObserver(this.handleModelEvent);
    this.filterModel.addObserver(this.handleModelEvent);
  }

  get filters() {
    return Object.values(FILTER_TYPES).map((type) => ({ type }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.filterComponent;

    this.filterComponent = new FilterView({
      filters,
      currentFilterType: this.filterModel.filter,
      onFilterTypeChange: this.handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.filterComponent, this.filterContainer);
      return;
    }

    replace(this.filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  handleModelEvent = () => {
    this.init();
  };

  handleFilterTypeChange = (filterType) => {
    if (this.filterModel.filter === filterType) {
      return;
    }

    this.filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
