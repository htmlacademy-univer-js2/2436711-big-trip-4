import { getRandomPoint } from '../mock/point';

const POINTS_COUNT = 10;

export default class PointsModel {
  constructor({ destinationModel, offersModel }) {
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.points = this.getMergedPoints(Array.from({ length: POINTS_COUNT }, getRandomPoint));
  }

  getPoints() {
    return this.points;
  }

  getMergedPoints(points) {
    return points.map((point) => {
      const offersByType = this.offersModel.getOffersByType(point.type);
      return {...point,
        destination: this.destinationModel.getDestinationById(point.destination),
        offers: point.offers.map((offerId) => (offersByType.find((offer) => (offer.id === offerId))))};
    });
  }
}
