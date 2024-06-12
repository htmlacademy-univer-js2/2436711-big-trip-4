export default function createInfoTemplate({ destinationsString, datesString, total }) {
  return (
    `
      <section class="trip-main__trip-info  trip-info">

        ${destinationsString || datesString
      ? `<div class="trip-info__main">
          ${destinationsString ? `<h1 class="trip-info__title">${destinationsString}</h1>` : ''}

          ${datesString ? `<p class="trip-info__dates">${datesString}</p>` : ''}
        </div>`
      : ''
    }

        ${total && total !== '0'
      ? `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
        </p>`
      : ''
    }

      </section>
    `
  );
}
