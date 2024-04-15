const createTripInfoTitle = (destinations) => destinations.map((d) => d.name).join(' &mdash; ');

const createTripInfoTemplate = (destinations) => `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${createTripInfoTitle(destinations)}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>
</section>`;

export { createTripInfoTemplate };
