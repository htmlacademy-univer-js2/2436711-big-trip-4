import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import InfoPresenter from './presenter/info-presenter';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import {render} from './framework/render';

const header = document.querySelector('.page-header');
const infoHeader = document.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});
const infoPresenter = new InfoPresenter({
  container: infoHeader
});

const filterPresenter = new FilterPresenter({
  container: headerFilterElement,
  filterModel,
  pointsModel
});

const boardPresenter = new BoardPresenter({
  container: containerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
  newPointButtonComponent
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
  boardPresenter.rerender();
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, infoHeader);

infoPresenter.init();
filterPresenter.init();
boardPresenter.init();
