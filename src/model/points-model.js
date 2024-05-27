import { getRandomPoint } from '../mock/point';

const POINTS_COUNT = 10;

export default class PointsModel {
  constructor() {
    this.points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  }

  getPoints() {
    return this.points;
  }
}
