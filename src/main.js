import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import InfoPresenter from './presenter/info-presenter';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import DestinationsApi from './api/destinations-api';
import OffersApi from './api/offers-api';
import PointsApi from './api/points-api';
import NewPointButtonPresenter from './presenter/new-point-button-presenter';

const AUTHORIZATION = 'Basic timurdistel';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const header = document.querySelector('.page-header');
const infoHeader = document.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');

const destinationsModel = new DestinationsModel({destinationsApi: new DestinationsApi(END_POINT, AUTHORIZATION)});
const offersModel = new OffersModel({offersApi: new OffersApi(END_POINT, AUTHORIZATION)});
const pointsModel = new PointsModel({pointsApi: new PointsApi(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const infoPresenter = new InfoPresenter({
  container: infoHeader,
  pointsModel,
  destinationsModel,
  offersModel
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
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

const disableNewEventButton = () => {
  setTimeout(() => {newPointButtonComponent.element.disabled = true;}, 0);
};

function handleNetworkProblems(actionType, updateType) {
  if(updateType.isError) {
    disableNewEventButton();
  }
}

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: infoHeader,
  component: newPointButtonComponent,
});

async function initModels() {
  await destinationsModel.init();
  await offersModel.init();
  await pointsModel.init();
  newPointButtonComponent.element.disabled = false;
}

pointsModel.addObserver(handleNetworkProblems);

initModels();

infoPresenter.init();
filterPresenter.init();
boardPresenter.init();
newPointButtonPresenter.init();
