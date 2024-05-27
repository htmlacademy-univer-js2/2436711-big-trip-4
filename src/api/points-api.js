import ApiService from '../framework/api-service';
import { API_METHOD } from '../const';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: API_METHOD.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: API_METHOD.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: API_METHOD.DELETE,
    });
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
