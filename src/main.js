import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';

import MockService from './service/mock-service.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import PointModel from './model/point-model.js';

import { RenderPosition } from './render.js';
import { render } from './framework/render.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const mainElement = bodyElement.querySelector('.page-main');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');
const eventListElement = mainElement.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointModel = new PointModel(mockService);

const tripPresenter = new TripPresenter(
  eventListElement,
  destinationsModel,
  offersModel,
  pointModel
);

render(new TripInfoView(destinationsModel, pointModel.get()), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

tripPresenter.init();
