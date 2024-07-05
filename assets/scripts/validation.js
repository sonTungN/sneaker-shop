function Validator(formOption) {
  let formSelector = document.querySelector(formOption.form);

  if (formSelector) {
    formOption.rules.forEach((rule) => {
      let inputElement = formSelector.querySelector(rule.selector);
      let errorElement = getParentBySelector(
        inputElement,
        formOption.formGroup,
      ).querySelector(".form-message");

      inputElement.onblur = function () {
        let errorMessage = rule.validate(inputElement.value);
        if (errorMessage) {
          errorElement.innerHTML = errorMessage;
          getParentBySelector(this, formOption.formGroup).classList.add(
            "invalid",
          );
        } else {
          errorElement.innerHTML = "";
          getParentBySelector(this, formOption.formGroup).classList.remove(
            "invalid",
          );
        }
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

// Get Selected Parent Element By Selector
function getParentBySelector(selector, parentSelector) {
  while (selector.parentElement) {
    if (selector.parentElement.matches(parentSelector)) {
      return selector.parentElement;
    }

    selector = selector.parentElement;
  }
}
