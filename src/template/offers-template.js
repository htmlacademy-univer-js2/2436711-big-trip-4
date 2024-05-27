export default function createOffersTemplate({ currentOffers, offers }) {
  return `
    <ul class="event__selected-offers">
      ${currentOffers.filter((offer) => offers.includes(offer.id)).map((offer) => `
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `).join('')}
    </ul>
  `;
}
