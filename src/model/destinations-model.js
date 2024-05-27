import { getDestinations } from '../mock/destination';

export default class DestinationModel {
  destinations = getDestinations();

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((dest) => (dest.id === id));
  }
}
