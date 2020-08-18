export class NewsCardList {
  constructor({ section }) {
    this._section = section;
    this._cardlist = this._section.querySelector(".cardlist");
  }

  addCard = (element) => {
    this._cardlist.append(element);
  };

  render = (newsList) => {
    this._section.setAttribute("style", "display: block");
    newsList.forEach((newsItem) => {
      this.addCard(newsItem);
    });
  };

  clear = (newsList) => {
    this._section.setAttribute("style", "display: none");
    newsList.splice(0, newsList.length);
    this._cardlist.innerHTML = "";
  };
}
