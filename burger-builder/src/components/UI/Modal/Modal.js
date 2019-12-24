import React, { memo, useRef } from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  children: PropTypes.element
};

function Modal(props) {
  const counter = useRef(0);
  console.log("Modal rendered: ", counter.current++);
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

export default memo(
  Modal,
  (prev, next) => prev.show === next.show && prev.children === next.children
);
