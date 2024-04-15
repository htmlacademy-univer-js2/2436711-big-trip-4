import { getRandomElement, getRandomInt } from '../util.js';
import { CITIES, DESCRIPTION, PicturesCount } from '../const.js';

const generateDestinations = () => CITIES.map((city) => (
  {
    id: crypto.randomUUID(),
    name: city,
    description: getRandomElement(DESCRIPTION),
    pictures: Array.from({length: getRandomInt(PicturesCount.MIN, PicturesCount.MAX)}, (_, index) => (
      {
        src: `https://loremflickr.com/248/152?random=${index}`,
        description: `${city} view`
      }
    ))
  }));

export { generateDestinations };
