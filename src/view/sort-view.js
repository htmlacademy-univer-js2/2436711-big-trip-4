import AbstractView from '../framework/view/abstract-view';

function createSortTemplate({sortType}) {
  return (
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <div class="trip-sort__item  trip-sort__item--day">
          <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day"
            ${sortType === 'day' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-day" data-sort-type="day">Day</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time"
            ${sortType === 'time' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-time" data-sort-type="time">Time</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price"
            ${sortType === 'price' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-price" data-sort-type="price">Price</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--offer">
          <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
          <label class="trip-sort__btn" for="sort-offer">Offers</label>
        </div>
      </form>
    `
  );
}

export default class SortView extends AbstractView {
  constructor({ onSortTypeChange, sortType }) {
    super();
    this.onSortTypeChange = onSortTypeChange;
    this.sortType = sortType;

    this.element.addEventListener('click', this.sortTypeChangeHandler);
  }

  sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'LABEL') {
      return;
    }

    event.preventDefault();
    this.onSortTypeChange(event.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate({ sortType: this.sortType});
  }
}
