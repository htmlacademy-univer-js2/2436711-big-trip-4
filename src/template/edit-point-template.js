import {EDITING_TYPE} from '../const';
import createEventSelectorTemplate from './event-selector-template';
import {camelizer} from '../utils';
import he from 'he';
import dayjs from 'dayjs';
import createDestinationListTemplate from './destination-list-template';
import createOffersSelectorTemplate from './offers-selector-template';
import createDestinationSectionTemplate from './destination-section-template';

export default function createEditPointTemplate({ point, destinations, allOffers, typeForm }) {
  const { type, dateFrom, dateTo, basePrice, destination, offers, isDisabled, isSaving, isDeleting } = point;
  const currentDestination = destinations.find((dest) => dest.id === destination);
  const isRenderDescription = currentDestination?.description || currentDestination?.pictures.length;
  const currentOffers = allOffers.find((offer) => offer.type === type)?.offers;
  const currentResetButton = typeForm === EDITING_TYPE.NEW ? 'Cancel' : 'Delete';
  const isSubmitDisabled = !destination;

  return `
    <li class="trip-events__item"><form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        ${createEventSelectorTemplate({isDisabled})}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${camelizer(type)}
        </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} value="${currentDestination ? he.encode(currentDestination.name) : ''}" list="destination-list-1">
        ${createDestinationListTemplate(destinations)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? 'disabled' : ''} value="${dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : ''}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? 'disabled' : ''} value="${dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : ''}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" ${isDisabled ? 'disabled' : ''} value="${he.encode(basePrice.toString())}">
      </div>

      <button class="event__save-btn  btn  btn--blue" ${isSubmitDisabled || isDisabled ? 'disabled' : ''} type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" ${isDisabled ? 'disabled' : ''} type="reset">${isDeleting ? 'Deleting...' : currentResetButton}</button>
      ${typeForm === EDITING_TYPE.NEW
    ? ''
    : `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}
    </header>

    ${!isRenderDescription && !currentOffers?.length
    ? ''
    : `<section class="event__details">
      ${createOffersSelectorTemplate({ offers, currentOffers, isDisabled })}
      ${!currentDestination?.description && !currentDestination?.pictures.length
    ? ''
    : createDestinationSectionTemplate(currentDestination)}
    </section>`}
  </form></li>`;
}
