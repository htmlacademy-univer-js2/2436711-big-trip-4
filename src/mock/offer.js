import { getRandomElement } from '../utils.js';
import {OFFER_TYPES_FLIGHT, PRICES_FLIGHT} from './const';

function generateOffersFlight() {
  return OFFER_TYPES_FLIGHT.map((offer, index) => ({
    id: `b4c3e4e6-9053-42ce-b747-e281314baa3${index}`,
    title: offer,
    price: PRICES_FLIGHT[index]
  }));
}

const offers = [{ type: 'flight', offers: generateOffersFlight() }];

function getRandomOffer() {
  return getRandomElement(offers);
}

function getAllOffers() {
  return offers;
}

export { getAllOffers, getRandomOffer };
