export class NewsCard {
  constructor(template, { link, image, date, title, description, source }) {
    this._template = template;
    this._link = link;
    this._image = image;
    this._date = date;
    this._title = title;
    this._description = description;
    this._source = source;
  }

  create = () => {
    const card = this._template.cloneNode(true).children[0];

    const link = card.querySelector(".link");
    const image = card.querySelector(".card__image");
    const date = card.querySelector(".card__date");
    const title = card.querySelector(".card__title");
    const description = card.querySelector(".card__paragraph");
    const source = card.querySelector(".card__source");

    link.setAttribute("href", this._link);
    image.setAttribute("src", this._image);

    image.onerror = () => {
      image.setAttribute("src", "../../images/not-found.svg");
    };

    image.setAttribute("style", `background-image: url(${this._image})`);

    if (this._image === "https:") {
      image.setAttribute("src", "../../images/not-found.svg");
    }

    date.textContent = this._date;
    title.textContent = this._title;
    description.textContent = this._description;
    source.textContent = this._source;

    return card;
  };
}
