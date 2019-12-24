import React, { useRef, memo } from "react";
import PropTypes from "prop-types";
import "./BuildControl.css";
import { BurgerContext } from "../../../../hooks/BurgerContext";

const BuildControl = props => {
  const counter = useRef(0);
  console.log("BuildControl rendered: ", counter.current++);
  return (
    <BurgerContext.Consumer>
      {({ addIng, removeIng }) => (
        <div className="BuildControl">
          <div className="Label">{props.label}</div>
          <button
            disabled={props.disabled}
            className="Less"
            onClick={() => removeIng(props.label)}
          >
            Less
          </button>
          <button className="More" onClick={() => addIng(props.label)}>
            More
          </button>
        </div>
      )}
    </BurgerContext.Consumer>
  );
};

BuildControl.propTypes = {
  label: PropTypes.string.isRequired
};

export default memo(BuildControl);
