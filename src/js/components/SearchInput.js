export class SearchInput {
  constructor({ node, onSearchSubmit }) {
    this._node = node;
    this._onSearchSubmit = onSearchSubmit;
  }

  setSubmitListener = () => {
    this._node.addEventListener("submit", (e) => {
      this._onSearchSubmit(e, this._node);
    });
  };
  // TODO: валидация
  _validate = () => {};
}
