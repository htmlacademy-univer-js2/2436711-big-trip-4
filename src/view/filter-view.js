import AbstractView from '../framework/view/abstract-view';

function createFilterTemplate(filters) {
  return (
    `
      <form class="trip-filters" action="#" method="get">

      ${filters.map(({count, type}) => `
        <div class="trip-filters__filter">
          <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${count === 0 ? 'disabled' : ''}>
          <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
        </div>
      `).join('')}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `
  );
}

export default class FilterView extends AbstractView{
  constructor(filters) {
    super();
    this.filters = filters;
  }

  get template() {
    return createFilterTemplate(this.filters);
  }
}
