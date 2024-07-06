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
    let rules = selectorRules[rule.selector];
    let errorMessage;

    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

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

  let selectorRules = {};

  let formElement = document.querySelector(formOption.form);
  if (formElement) {
    formOption.rules.forEach((rule) => {
      // Get all rules for a selector
      if (!Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector] = [rule.validate];
      } else {
        selectorRules[rule.selector].push(rule.validate);
      }

      let inputElement = formElement.querySelector(rule.selector);
      let errorElement = getParentBySelector(
        inputElement,
        formOption.formGroup,
      ).querySelector(formOption.formErrorSelector);

      // Action Handler
      inputElement.onblur = function () {
        displayErrorMessage(inputElement, rule, errorElement);
      };

      inputElement.oninput = function () {
        errorElement.innerHTML = "";
        getParentBySelector(
          inputElement,
          formOption.formGroup,
        ).classList.remove("invalid");
      };
    });
  }
  console.log(selectorRules);
}

Validator.isRequired = function (selector, message = "") {
  return {
    selector: selector,
    validate: function (value) {
      return value ? undefined : message || "Please fill in this form!";
    },
  };
};

Validator.isEmail = function (selector, message = "") {
  return {
    selector: selector,
    validate: function (value) {
      let pattern = /^\w+('-'?\w+)*@\w+('-'?\w+)*(\.\w{2,3})+$/;
      return pattern.test(value)
        ? undefined
        : message || "Please enter a valid email!";
    },
  };
};

Validator.isPassword = function (selector, message = "") {
  return {
    selector: selector,
    validate: function (value) {
      let pattern = /^[a-zA-Z0-9]{5,15}$/;
      return pattern.test(value)
        ? undefined
        : message || "Must have at least 5 characters with no special!";
    },
  };
};
