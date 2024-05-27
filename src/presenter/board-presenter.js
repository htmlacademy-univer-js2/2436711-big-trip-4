import {remove, render} from '../framework/render';
import PointListView from '../view/point-list-view';
import SortView from '../view/sort-view';
import EmptyPointView from '../view/empty-point-view';
import PointPresenter from './point-presenter';
import {sortDay, sortPrice, sortTime} from '../utils';

export default class BoardPresenter {
  constructor({container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.pointPresenters = new Map();
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.sortedPoints = [...this.points.sort(sortDay)];
    this.sortType = 'day';

    if (this.points.length) {
      this.sortComponent = new SortView({
        onSortTypeChange: this.handleSortTypeChange,
        sortType: this.sortType
      });

      this.pointsListComponent = new PointListView();

      render(this.sortComponent, this.container);
      render(this.pointsListComponent, this.container);

      this.points.forEach((point) => this.renderPoint(point));
    } else {
      render(new EmptyPointView(), this.container);
    }
  }

  handlePointChange = (updatedPoint) => {
    this.points = this.points.map((item) => item.id === updatedPoint.id ? updatedPoint : item);
    this.sortedPoints = this.sortedPoints.map((item) => item.id === updatedPoint.id ? updatedPoint : item);
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

  handleSortTypeChange = (sortType) => {
    if (this.sortType === sortType) {
      return;
    }

    switch(sortType) {
      case 'time':
        this.points.sort(sortTime);
        break;
      case 'price':
        this.points.sort(sortPrice);
        break;
      default:
        this.points = [...this.sortedPoints];
    }
    this.sortType = sortType;

    this.pointPresenters.forEach((presenter) => presenter.destroy());
    this.pointPresenters.clear();
    remove(this.sortComponent);
    this.sortComponent = new SortView({
      onSortTypeChange: this.handleSortTypeChange,
      sortType: this.sortType
    });
    render(this.sortComponent, this.container);
    render(this.pointsListComponent, this.container);

    this.points.forEach((point) => this.renderPoint(point));
  };
}
