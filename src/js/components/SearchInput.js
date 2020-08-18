export class SearchInput {
  constructor({ node, onSubmit }) {
    this.node = node;
    this._onSubmit = onSubmit;
  }

  setSubmitListener = () => {
    this.node.addEventListener("submit", (e) => {
      this._onSubmit(e, this.node);
    });
  };
  // TODO: валидация
  _validate = () => {};
}
