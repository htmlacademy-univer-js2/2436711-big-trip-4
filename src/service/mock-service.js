import { generateDestinations } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generateMockPoints } from '../mock/point.js';
import { getRandomElement, getRandomInt } from '../util.js';
import { PointsCount, CountOffers, POINT_TYPE } from '../const.js';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = generateDestinations();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  generateOffers = () => POINT_TYPE.map((type) => {
    const length = getRandomInt(CountOffers.MIN, CountOffers.MAX);
    return {
      type,
      offers: Array.from({length: length}, () => generateOffer())
    };
  });

  generatePoints = () => Array.from({length: getRandomInt(PointsCount.MIN, PointsCount.MAX)}, () => {
    const type = getRandomElement(POINT_TYPE);

    const destinations = getRandomElement(this.#destinations);

    const hasOffers = getRandomInt(0, 1);

    const offersByType = this.#offers.find((offer) => offer.type === type);

    let offerIds = [];

    if (hasOffers) {
      offerIds = offersByType.offers.map((offer) => offer.id);
    }

    return generateMockPoints(type, destinations.id, offerIds);
  });
}
