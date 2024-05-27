import {render} from '../framework/render';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import EmptyPointView from '../view/empty-point-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  constructor({container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.pointPresenters = new Map();
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    if (this.points.length) {
      this.pointsListComponent = new PointListView();
      this.sortComponent = new SortView();

      render(this.sortComponent, this.container);
      render(this.pointsListComponent, this.container);

      this.points.forEach((point) => this.renderPoint(point));
    } else {
      render(new EmptyPointView(), this.container);
    }
  }

  handlePointChange = (updatedPoint) => {
    this.points = this.points.map((item) => item.id === updatedPoint.id ? updatedPoint : item);
    this.pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  handleModeChange = () => {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  };

  renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.pointsListComponent.element,
      onDataChange: this.handlePointChange,
      onModeChange: this.handleModeChange});
    pointPresenter.init(point);
    this.pointPresenters.set(point.id, pointPresenter);
  }
}
