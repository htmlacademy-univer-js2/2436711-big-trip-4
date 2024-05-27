import { POINT_TYPES } from '../const';
import { camelizer } from '../utils';

export default function createEventItemsTemplate() {
  return POINT_TYPES.map((item) => (`
      <div class="event__type-item">
        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${camelizer(item)}</label>
      </div>
    `)).join('');
}
