import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

Input.propTypes = {
  label: PropTypes.string.isRequired,
  customtype: PropTypes.string,
  errortext: PropTypes.string
};

export const inputType = {
  INPUT: "input",
  SELECT: "select",
  TEXT_AREA: "textarea"
};

function Input(props) {
  let inputElement = null;
  switch (props.customtype) {
    case inputType.TEXT_AREA:
      inputElement = <textarea className={styles.InputElement} {...props} />;
      break;
    case inputType.SELECT:
      inputElement = (
        <select className={styles.InputElement} {...props}>
          {props.children}
        </select>
      );
      break;
    default:
      inputElement = <input className={styles.InputElement} {...props} />;
      break;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {props.errortext ? <p>{props.errortext}</p> : null}
    </div>
  );
}

export default Input;
