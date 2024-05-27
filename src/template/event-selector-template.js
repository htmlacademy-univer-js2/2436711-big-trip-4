import createEventItemsTemplate from './event-items-template';

export default function createEventSelectorTemplate({isDisabled}) {
  return (`
    <input class="event__type-toggle visually-hidden" ${isDisabled ? 'disabled' : ''} id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${createEventItemsTemplate()}
      </fieldset>
    </div>
  `);
}
