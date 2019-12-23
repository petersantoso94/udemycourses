import React, { memo } from "react";
import "./Backdrop.css";
import PropTypes from "prop-types";

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

function Backdrop(props) {
  return props.show ? (
    <div onClick={props.hide} className="Backdrop"></div>
  ) : null;
}

export default memo(Backdrop);
