import AbstractView from '../framework/view/abstract-view';
import createPointTemplate from '../template/point-template';

export default class PointView extends AbstractView {
  constructor({ point, onEditClick, onFavoriteClick, destination, offers }) {
    super();
    this.point = point;
    this.handleEditClick = onEditClick;
    this.handleFavoriteClick = onFavoriteClick;
    this.destination = destination;
    this.offers = offers;

    this.editClickHandler = this.editClickHandler.bind(this);
    this.favoriteClickHandler = this.favoriteClickHandler.bind(this);

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({ point: this.point, destination: this.destination, currentOffers: this.offers });
  }

  favoriteClickHandler = (event) => {
    event.preventDefault();
    this.handleFavoriteClick();
  };

  editClickHandler = (event) => {
    event.preventDefault();
    this.handleEditClick();
  };
}
