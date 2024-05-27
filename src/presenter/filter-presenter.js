import FilterView from '../view/filter-view';
import {render} from '../framework/render';

export default class FilterPresenter {
  constructor({container, filters}) {
    this.container = container;
    this.filters = filters;
  }

  init() {
    render(new FilterView(this.filters), this.container);
  }
}
