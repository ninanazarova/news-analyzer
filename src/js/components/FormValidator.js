import { ERROR_MESSAGES } from "../../js/constants/constants.js";

export class FormValidator {
  constructor(form) {
    this._form = form;
  }

  _addError = (input) => {
    const errorElem = input.parentNode.querySelector(".search__error");
    errorElem.textContent = input.validationMessage;
  };

  _checkEmpty = (input) => {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(ERROR_MESSAGES.empty);
      return false;
    }

    return true;
  };

  _checkLength = (input) => {
    input.setCustomValidity("");
    input.setAttribute("minlength", "2");
    input.setAttribute("maxlength", "30");

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(ERROR_MESSAGES.wrongLength);
      return false;
    }
    return true;
  };

  checkInputValidity = (input) => {
    return this._checkEmpty(input) && this._checkLength(input);
  };

  _setSubmitButtonState = () => {
    const isValid = this.checkInputValidity(this._form.elements.input);
    const submit = this._form.elements.submit;
    if (isValid) {
      submit.removeAttribute("disabled", "disabled");
      this._form.elements.input.style.border = "1px solid #2f71e5";
      submit.classList.remove("search__button_disabled");
    } else {
      submit.setAttribute("disabled", "disabled");
      this._form.elements.input.style.border = "1px solid #d85757";
      submit.classList.add("search__button_disabled");
    }
  };

  disableSubmitButton = () => {
    const submit = this._form.elements.submit;

    submit.setAttribute("disabled", "disabled");
    submit.setAttribute("style", "cursor: not-allowed;");
  };

  enableSubmitButton = () => {
    const submit = this._form.elements.submit;

    submit.removeAttribute("disabled", "disabled");
    submit.setAttribute("style", "cursor: pointer;");
  };

  setEventListeners = () => {
    this._form.addEventListener("input", (event) => {
      this.checkInputValidity(event.target);
      this._addError(event.target);
      this._setSubmitButtonState();
    });
  };
}
