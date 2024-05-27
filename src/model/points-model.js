import { getRandomPoint } from '../mock/point';
import Observable from '../framework/observable';

const POINTS_COUNT = 10;

export default class PointsModel extends Observable {
  constructor() {
    super();
    this.points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  }

  getPoints() {
    return this.points;
  }

  updatePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.points = [
      ...this.points.slice(0, index),
      update,
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.points = [
      ...this.points,
      update
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.points = this.points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }
}
