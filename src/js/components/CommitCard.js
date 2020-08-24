export class CommmitCard {
  constructor(template, { link, name, email, date, message, userPic }) {
    this._template = template;
    this._link = link;
    this._name = name;
    this._email = email;
    this._date = date;
    this._message = message;
    this._userPic = userPic;
  }

  create = () => {
    const card = this._template.cloneNode(true).children[0];

    const name = card.querySelector(".commit__name");
    const email = card.querySelector(".commit__email");
    const date = card.querySelector(".commit__date");
    const message = card.querySelector(".commit__message");
    const userPic = card.querySelector(".commit__user-pic");

    card.setAttribute("href", this._link);
    name.textContent = this._name;
    email.textContent = this._email;
    date.textContent = this._date;
    message.textContent = this._message;
    userPic.setAttribute("src", this._userPic);

    return card;
  };
}
