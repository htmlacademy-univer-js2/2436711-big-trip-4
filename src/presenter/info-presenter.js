import InfoView from '../view/info-view';
import {render, RenderPosition} from '../framework/render';

export default class InfoPresenter {
  infoView = new InfoView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.infoView, this.container, RenderPosition.AFTERBEGIN);
  }
}
