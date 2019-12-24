import React, { useRef } from "react";
import PropTypes from "prop-types";
import { capitalize } from "../../../utils/Helper";
import Button, { buttonType } from "../../UI/Button/Button";

const OrderSummary = props => {
  const counter = useRef(0);
  console.log("OrderSummary rendered: ", counter.current++);
  const summary = Object.keys(props.ingredients).map(ig => {
    return (
      <li key={ig}>
        {capitalize(ig)} : {props.ingredients[ig]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order : ${props.totalPrice},-</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{summary}</ul>
      <p>Continue to Checkout?</p>
      <Button buttonType={buttonType.DANGER} onClick={props.onCancel}>
        <>Cancel</>
      </Button>
      <Button buttonType={buttonType.SUCCESS} onClick={props.onSubmit}>
        <>Continue</>
      </Button>
    </>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default OrderSummary;
