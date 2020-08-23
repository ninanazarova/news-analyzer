export class NewsCardList {
  constructor({ section }) {
    this._section = section;
    this._cardlist = this._section.querySelector(".cardlist");
  }

  addCard = (element) => {
    this._section.setAttribute("style", "display: block");
    this._cardlist.append(element);
  };

  clear = () => {
    this._section.setAttribute("style", "display: none");

    while (this._cardlist.firstChild) {
      this._cardlist.removeChild(this._cardlist.firstChild);
    }
  };
}
