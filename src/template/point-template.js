import dayjs from 'dayjs';
import {camelizer, getDuration, humanizeHHmm, shortDate} from '../utils';
import he from 'he';
import createOffersTemplate from './offers-template';

export default function createPointTemplate({ point, destination, currentOffers }) {
  const { basePrice, dateFrom, dateTo, isFavorite, type, offers } = point;
  const favouriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${shortDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${camelizer(type)} ${destination?.name ? he.encode(destination?.name) : ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${humanizeHHmm(dateFrom)}</time>
              &mdash;
            <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${humanizeHHmm(dateTo)}</time>
          </p>
          <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;
          <span class="event__price-value">${he.encode(basePrice.toString())}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${offers.length > 0 ? createOffersTemplate({ currentOffers, offers }) : ''}
        <button class="event__favorite-btn ${favouriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}
