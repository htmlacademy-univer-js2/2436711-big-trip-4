import { FilterMessages } from '../const.js';

const createEmptyListTemplate = (filter) => `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">${FilterMessages[filter]}</p>
</section>`;

export { createEmptyListTemplate };
