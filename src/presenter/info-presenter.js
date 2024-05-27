import InfoView from '../view/info-view';
import { RenderPosition, remove, render, replace } from '../framework/render';
import { getInfoFromPoints } from '../utils';

export default class InfoPresenter {
  #infoComponent = null;
  #container = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderInfo();
  }

  #renderInfo = () => {
    const prevInfoComponent = this.#infoComponent;

    const points = this.#pointsModel.points;
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.offers;

    this.#infoComponent = new InfoView({ info: getInfoFromPoints({ points, destinations, offers }) });

    if (!prevInfoComponent) {
      render(
        this.#infoComponent,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  };

  #handleModelChange = () => {
    this.init();
  };
}
