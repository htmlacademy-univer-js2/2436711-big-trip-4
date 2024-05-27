import AbstractView from '../framework/view/abstract-view';
import createSortTemplate from '../template/sort-template';

export default class SortView extends AbstractView {
  #onSortTypeChange = null;
  #sortType = null;

  constructor({ onSortTypeChange, sortType }) {
    super();
    this.#onSortTypeChange = onSortTypeChange;
    this.#sortType = sortType;

    this.element.addEventListener('click', this.sortTypeChangeHandler);
  }

  sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'LABEL' || event.target.outerText === 'EVENT' || event.target.outerText === 'OFFERS') {
      return;
    }

    event.preventDefault();
    this.#onSortTypeChange(event.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate({ sortType: this.#sortType});
  }
}
