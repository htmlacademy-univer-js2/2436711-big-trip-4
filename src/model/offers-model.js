import { getAllOffers } from '../mock/offer';

export default class OffersModel {
  offers = getAllOffers();

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => (offer.type === type))?.offers;
  }
}
