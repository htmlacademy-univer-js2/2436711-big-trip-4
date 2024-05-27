import createOfferItemTemplate from './offer-item-template';

export default function createOffersSelectorTemplate({offers, currentOffers, isDisabled}) {
  return currentOffers.length
    ? `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOfferItemTemplate({offers, currentOffers, isDisabled})}
        </div>
      </section>
    `
    : '';
}
