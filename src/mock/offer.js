import { getRandomElement } from '../utils.js';
import {OFFER_TYPES_FLIGHT, OFFER_TYPES_TAXI, PRICES_FLIGHT, PRICES_TAXI} from './const';

function generateOffersFlight() {
  return OFFER_TYPES_FLIGHT.map((offer, index) => ({
    id: `b4c3e4e6-9053-42ce-b747-e281314baa3${index}`,
    title: offer,
    price: PRICES_FLIGHT[index]
  }));
}

function generateOffersTaxi() {
  return OFFER_TYPES_TAXI.map((offer, index) => ({
    id: `b4c3e4e6-9053-42ce-b747-e281314bba3${index}`,
    title: offer,
    price: PRICES_TAXI[index]
  }));
}

const offers = [{ type: 'flight', offers: generateOffersFlight() }, { type: 'taxi', offers: generateOffersTaxi() }];

function getRandomOffer() {
  return getRandomElement(offers);
}

function getAllOffers() {
  return offers;
}

export { getAllOffers, getRandomOffer };
