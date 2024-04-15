import { generateDestination } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generateMockPoints } from '../mock/point.js';
import { getRandomElement, getRandomInt } from '../util.js';
import { POINT_COUNT, CountOffers, POINT_TYPE } from '../const.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations = () => this.destinations;

  getOffers = () => this.offers;

  getPoints = () => this.points;

  generateDestinations = () => generateDestination();

  generateOffers = () => POINT_TYPE.map((type) => {
    const length = getRandomInt(CountOffers.MIN, CountOffers.MAX);
    return {
      type,
      offers: Array.from({length: length}, () => generateOffer())
    };
  });

  generatePoints = () => Array.from({length: POINT_COUNT}, () => {
    const type = getRandomElement(POINT_TYPE);

    const destination = getRandomElement(this.destinations);

    const hasOffers = getRandomInt(0, 1);

    const offersByType = this.offers.find((offer) => offer.type === type);

    let offerIds = [];

    if (hasOffers) {
      offerIds = offersByType.offers.map((offer) => offer.id);
    }

    return generateMockPoints(type, destination.id, offerIds);
  });
}
