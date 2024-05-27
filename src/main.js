import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import InfoPresenter from './presenter/info-presenter';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import PointsModel from './model/points-model';
import {generateFilter} from './utils';

const header = document.querySelector('.page-header');
const infoHeader = document.querySelector('.trip-main');
const headerFilterElement = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const containerElement = main.querySelector('.trip-events');

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();

const filters = generateFilter(pointsModel.points);

const infoPresenter = new InfoPresenter({container: infoHeader});
const filterPresenter = new FilterPresenter({container: headerFilterElement, filters});
const boardPresenter = new BoardPresenter({container: containerElement, pointsModel, destinationsModel, offersModel});

infoPresenter.init();
filterPresenter.init();
boardPresenter.init();
