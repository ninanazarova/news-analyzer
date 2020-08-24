export class CommitCardList {
  constructor({ cardlist }) {
    this._cardlist = cardlist;
  }

  addCard = (element) => {
    this._cardlist.append(element);
  };
}
