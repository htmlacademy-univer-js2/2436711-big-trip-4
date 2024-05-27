import Observable from '../framework/observable';

export default class DestinationModel extends Observable {
  #destinations = [];
  #destinationsApi = null;

  constructor({destinationsApi}) {
    super();
    this.#destinationsApi = destinationsApi;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((dest) => (dest.id === id));
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApi.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
