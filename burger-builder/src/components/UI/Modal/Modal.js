import React, { memo } from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

function Modal(props) {
  return (
    <div>
      <Backdrop show={props.show} hide={props.hide} />
      <div
        className="Modal"
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default memo(Modal);