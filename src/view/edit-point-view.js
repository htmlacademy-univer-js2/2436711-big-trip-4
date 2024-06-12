import dayjs from 'dayjs';
import {EDITING_TYPE} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import DatePicker from '../date-picker';
import createEditPointTemplate from '../template/edit-point-template';
import {BLANK_POINT} from '../const.js';

export default class EditPointView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #handleFormReset = null;
  #handleDeleteClick = null;
  #destinations = null;
  #offers = null;
  #type = null;
  #datePickerFrom = null;
  #datePickerTo = null;

  constructor({ point = BLANK_POINT, onFormSubmit, onFormReset, destinations, offers, onDeleteClick, type = EDITING_TYPE.UPDATE }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#type = type;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this.#handleDeleteClick = onDeleteClick;
    this._setState(EditPointView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({ point: this._state, destinations: this.#destinations, allOffers: this.#offers, typeForm: this.#type });
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#formResetHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatePickers();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  };

  #setDatePickers = () => {
    this.#datePickerFrom = new DatePicker({
      element: this.element.querySelector('#event-start-time-1'),
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onClose: this.#dateFromCloseHandler,
    });

    this.#datePickerTo = new DatePicker({
      element: this.element.querySelector('#event-end-time-1'),
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onClose: this.#dateToCloseHandler,
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });

    this.#datePickerTo.setMinDate(this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });

    this.#datePickerFrom.setMaxDate(this._state.dateTo);
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (!this._state.destination || !this._state.dateFrom || !this._state.dateTo || isNaN(this._state.basePrice)) {
      return;
    }
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: [],
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((dest) => dest.name === evt.target.value).id;
    this.updateElement({
      destination: selectedDestination,
    });
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map(({ id }) => id.split('-').slice(3).join('-'));

    this._setState({
      offers: selectedOffers
    });
  };

  reset = (point) => {
    this.updateElement(EditPointView.parsePointToState(point));
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state,
      dateFrom: dayjs(state.dateFrom).format(),
      dateTo: dayjs(state.dateTo).format(),
      basePrice: Number(state.basePrice)
    };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
