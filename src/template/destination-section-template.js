import createPicturesSection from './pictures-section-template';

export default function createDestinationSectionTemplate({ description, pictures, name }) {
  return name
    ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${createPicturesSection(pictures)}
      </section>
    `
    : '';
}
