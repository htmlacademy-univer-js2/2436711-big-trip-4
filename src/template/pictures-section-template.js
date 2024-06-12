export default function createPicturesSection(pictures) {
  return pictures.length
    ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((item) => (`<img class="event__photo" src="${item.src}" alt="${item.description}">`)).join('')}
          </div>
        </div>
      `
    : '';
}
