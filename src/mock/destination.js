import { getRandomElement, getRandomInt } from '../utils';
import {DESTINATIONS} from '../const';
import {DESCRIPTION} from './const';

const destinations = DESTINATIONS.map((item, index) => ({
  id: index,
  description: DESCRIPTION,
  name: item,
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInt(1, 100)}`,
      description: DESCRIPTION
    }, {
      src: `https://loremflickr.com/248/152?random=${getRandomInt(100, 200)}`,
      description: DESCRIPTION
    }, {
      src: `https://loremflickr.com/248/152?random=${getRandomInt(200, 300)}`,
      description: DESCRIPTION
    }]
}));

function getRandomDestination() {
  return getRandomElement(destinations);
}

function getDestinations() {
  return destinations;
}

export { getRandomDestination, getDestinations };
