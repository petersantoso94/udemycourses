import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

export const buttonType = {
  SUCCESS: "Success",
  DANGER: "Danger"
};

Button.propTypes = {
  buttonType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

function Button(props) {
  return (
    <button className={`Button ${props.buttonType}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
