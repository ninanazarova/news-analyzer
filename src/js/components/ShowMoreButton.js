export class ShowMoreButton {
  constructor({ button, onClick }) {
    this._button = button;
    this._onClick = onClick;
    this._clickCount = 0;
  }

  setClickListener = () => {
    this._button.addEventListener("click", () => {
      ++this._clickCount;
      this._onClick(this._clickCount);
    });
  };
}
