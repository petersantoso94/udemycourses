import React, { useRef, memo } from "react";
import "./BuildControls.css";
import PropTypes from "prop-types";
import BuildControl from "./BuildControl/BuildControl";
import { ingredientType } from "../Ingredients/Ingredients";

const BuildControls = props => {
  const counter = useRef(0);
  console.log("BuildControls rendered: ", counter.current++);
  let disabledOrder = true;
  const controls = Object.keys(ingredientType).map(igkey => {
    if (!props.disabledInfo[igkey]) {
      disabledOrder = false;
    }
    return (
      <BuildControl
        label={igkey}
        key={igkey}
        disabled={props.disabledInfo[igkey]}
      />
    );
  });

  return (
    <div className="BuildControls">
      <div>
        Total Price: <strong>${props.totalPrice},-</strong>
      </div>
      {controls}
      <button
        className="OrderButton"
        disabled={disabledOrder}
        onClick={props.purchaseHandler}
      >
        Order Now
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  disabledInfo: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default memo(BuildControls);
