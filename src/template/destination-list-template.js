export default function createDestinationListTemplate(destinations) {
  return `
    <datalist id="destination-list-1">
      ${destinations.map((item) => (`<option value="${item.name}"></option>`)).join('')}
    </datalist>
  `;
}
