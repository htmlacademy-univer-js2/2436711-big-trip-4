import Observable from '../framework/observable';
import { UPDATE_TYPE } from '../const';

export default class OffersModel extends Observable {
  #offers = [];
  #offersApi = null;

  constructor({ offersApi }) {
    super();
    this.#offersApi = offersApi;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.offers.find((offer) => (offer.type === type))?.offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApi.offers;
    } catch(err) {
      this.#offers = [];
      this._notify(UPDATE_TYPE.INIT, {isError : true });
    }
  }
}
