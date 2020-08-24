export class ShowMoreButton {
  constructor({ button, onClick }) {
    this._button = button;
    this._onClick = onClick;
    this._clickCount = 0;
  }

  setClickListener = (searchStorage) => {
    this._button.addEventListener("click", () => {
      this._clickCount++;

      if (this._clickCount + 1 === searchStorage.getChunksAmount()) {
        this._button.style.display = "none";
      }

      this._onClick(this._clickCount);
    });
  };
}
