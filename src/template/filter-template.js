import { FILTERS } from '../const.js';

const createFilterTemplate = (activeFilter) => {
  let template = '';
  let check = '';
  FILTERS.forEach((filter) => {
    check = activeFilter === filter ? 'checked' : 'disabled';
    template += `<div class="trip-filters__filter">
    <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${check}>
    <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter.toLowerCase()}</label>
  </div>`;
  });
  return `<form class="trip-filters" action="#" method="get">
    ${template}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
};

export { createFilterTemplate };
