import React, { useRef } from "react";
import Burger from "../Burger/Burger";
import Button, { buttonType } from "../UI/Button/Button";
import PropTypes from "prop-types";
import "./CheckoutSummary.css";

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired
};

function CheckoutSummary(props) {
  const counter = useRef(0);
  console.log("CheckoutSummary rendered: ", counter.current++);
  return (
    <div className="CheckoutSummary">
      <h1>
        We hope it taste well, your $<strong>{props.price}</strong> burger!
      </h1>
      <div>
        <div style={{ width: "100%", margin: "auto" }}>
          <Burger ingredients={props.ingredients} />
        </div>

        <Button buttonType={buttonType.DANGER} onClick={props.cancelHandler}>
          <>Cancel</>
        </Button>
        <Button buttonType={buttonType.SUCCESS} onClick={props.submitHandler}>
          <>Submit</>
        </Button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
