import { useState, useCallback } from "react";

export const ValidationType = {
  REQUIRED: "Req",
  MAX5: "Max5"
};
const ValidationErrorText = {
  Req: "This field is required",
  Max5: "Maximum 5"
};
// true=valid
const ValidationFunction = {
  Req: value => {
    return !!value.trim();
  },
  Max5: value => value.length <= 5
};
const validate = (rule, value) => {
  if (typeof ValidationFunction[rule] !== "function") {
    console.error("validation rule invalid: ", rule);
    return false;
  }
  return ValidationFunction[rule](value);
};
//consider to use form input dynamically so we can modify the for in runtime by manipulating the state
//expected ```name: { value: "", validation: [ValidationType.REQUIRED], errorMsg: "" }```

export const UseForm = initialVal => {
  const [state, setState] = useState(initialVal);

  const validateElement = useCallback(
    (name, value) => {
      const updatedState = { ...state };
      const updatedValue = { ...updatedState[name] };

      if (
        !updatedValue.validation ||
        (Array.isArray(updatedValue.validation) &&
          updatedValue.validation.length === 0)
      ) {
        // no validation selected
        return;
      }
      // do the validation
      // use default error message for iterable validation
      let iterableRules = Array.isArray(updatedValue.validation)
        ? updatedValue.validation
        : Object.keys(updatedValue.validation);
      for (let idx in iterableRules) {
        const rule = iterableRules[idx];
        //if true then valid
        if (!validate(rule, value)) {
          // if not valid, set error message
          updatedValue.errorMsg = Array.isArray(updatedValue.validation)
            ? ValidationErrorText[rule]
            : updatedValue.validation[rule];

          break;
        } else {
          // if valid, remove error message
          updatedValue.errorMsg = "";
        }
      }
      return updatedValue;
    },
    [state]
  );

  return {
    form: state,
    onChangeHandler: e => {
      const updatedState = { ...state };
      const updatedValue = { ...updatedState[e.target.name] };
      updatedValue.value = e.target.value;
      updatedState[e.target.name] = updatedValue;
      setState(updatedState);
    },
    onBlurHandler: e => {
      const updatedState = { ...state };
      const updatedValue = validateElement(e.target.name, e.target.value);
      updatedState[e.target.name] = updatedValue;
      setState(updatedState);
    },
    isFormValid: () => {
      let isValid = true;
      const updatedState = { ...state };
      for (let key in state) {
        const updatedValue = validateElement(key, state[key].value);
        if (updatedValue) {
          //there is invalid value for one rule
          updatedState[key] = updatedValue;
          if (updatedValue.errorMsg) isValid = false;
        }
      }
      setState(updatedState);
      return isValid;
    }
  };
};
