export class ShowMoreButton {
  constructor({ button, onClick }) {
    this._button = button;
    this._onClick = onClick;
    this._clickCount = 0;
  }

  setClickListener = (searchStorage) => {
    this._button.addEventListener("click", () => {
      ++this._clickCount;

      //мб как то вынести этот иф в другую функцию и вызывать ее здесь (не знаю как назвать ее)
      if (searchStorage.getChunksAmount() === this._clickCount + 1) {
        this._button.style.display = "none";
      }
      this._onClick(this._clickCount);
    });
  };
}
