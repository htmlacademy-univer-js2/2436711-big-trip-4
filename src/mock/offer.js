import { getRandomElement, getRandomInt } from '../util.js';
import { OFFERS_TITLE, Price } from '../const.js';

const generateOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomElement(OFFERS_TITLE),
  price: getRandomInt(Price.MIN, Price.MAX),
});

export { generateOffer };
