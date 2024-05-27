import { getDestinations } from '../mock/destination';

export default class DestinationsModel {
  destinations = getDestinations();

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((dest) => (dest.id === id));
  }
}
