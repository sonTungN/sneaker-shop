function Validator(formOption) {
  // Get Selected Parent Element By Selector
  function getParentBySelector(selector, parentSelector) {
    while (selector.parentElement) {
      if (selector.parentElement.matches(parentSelector)) {
        return selector.parentElement;
      }

      selector = selector.parentElement;
    }
  }

  // Displaying Error Message On Interface
  function displayErrorMessage(inputElement, rule, errorElement) {
    let errorMessage = rule.validate(inputElement.value);
    if (errorMessage) {
      errorElement.innerHTML = errorMessage;
      getParentBySelector(inputElement, formOption.formGroup).classList.add(
        "invalid",
      );
    } else {
      errorElement.innerHTML = "";
      getParentBySelector(inputElement, formOption.formGroup).classList.remove(
        "invalid",
      );
    }
  }

  let formSelector = document.querySelector(formOption.form);
  if (formSelector) {
    formOption.rules.forEach((rule) => {
      let inputElement = formSelector.querySelector(rule.selector);
      let errorElement = getParentBySelector(
        inputElement,
        formOption.formGroup,
      ).querySelector(".form-message");

      inputElement.onblur = function () {
        displayErrorMessage(this, rule, errorElement);
      };

      inputElement.oninput = function () {
        errorElement.innerHTML = "";
        getParentBySelector(this, formOption.formGroup).classList.remove(
          "invalid",
        );
      };
    });
  }
}

Validator.isRequired = function (selector, message = "") {
  return {
    selector: selector,
    validate: function (value) {
      return value ? undefined : message || "Please fill in this form!";
    },
  };
};

Validator.minLength = function () {};
