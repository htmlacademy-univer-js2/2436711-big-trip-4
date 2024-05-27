import Observable from '../framework/observable';
import { UPDATE_TYPE } from '../const';

export default class PointsModel extends Observable {
  #points = [];
  #pointsApi = null;

  constructor({ pointsApi }) {
    super();
    this.#pointsApi = pointsApi;
  }

  get points() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApi.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      ...this.#points,
      update
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }

  async init() {
    try {
      const points = await this.#pointsApi.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
