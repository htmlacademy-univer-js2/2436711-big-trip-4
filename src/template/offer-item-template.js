import {getLastWord} from '../utils';

export default function createOfferItemTemplate({offers, currentOffers, isDisabled}) {
  return currentOffers.map((item) => {
    const checkedClassname = offers.some((curValue) => (curValue === item.id)) ? 'checked' : '';
    const slug = getLastWord(item.title);
    return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" ${isDisabled ? 'disabled' : ''} id="event-offer-${slug}-${item.id}" type="checkbox" name="event-offer-${slug}" ${checkedClassname}>
          <label class="event__offer-label" for="event-offer-${slug}-${item.id}">
            <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>
      `;
  }).join('');
}
