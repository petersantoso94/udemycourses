import React from "react";
import PropTypes from "prop-types";
import "./Order.css";
import { capitalize } from "../../utils/Helper";

Order.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
};
function Order(props) {
  return (
    <div className="Order">
      <p>Ingredients:</p>
      <ul>
        {Object.keys(props.ingredients).map(ig => (
          <li key={ig}>
            {capitalize(ig)} ({props.ingredients[ig]})
          </li>
        ))}
      </ul>
      <p>
        Price: <strong>${props.price}</strong>
      </p>
    </div>
  );
}

export default Order;
