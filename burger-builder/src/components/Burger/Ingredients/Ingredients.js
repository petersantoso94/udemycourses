import React from "react";
import PropTypes from "prop-types";
import "./Ingredients.css";

export const ingredientType = {
  CHEESE: "Cheese",
  BACON: "Bacon",
  MEAT: "Meat",
  SALAD: "Salad"
};

export const breadType = {
  BREAD_BOTTOM: "BreadBottom",
  SEEDS1: "Seeds1",
  SEEDS2: "Seeds2",
  BREAD_TOP: "BreadTop"
};

const Ingredients = props => {
  // console.log("Ingredients", props);
  let ingredient = null;
  switch (props.type) {
    case breadType.BREAD_TOP:
      ingredient = (
        <div className={breadType.BREAD_TOP}>
          <div className={breadType.SEEDS1}></div>
          <div className={breadType.SEEDS2}></div>
        </div>
      );
      break;
    default:
      ingredient = <div className={props.type}></div>;
      break;
  }
  return ingredient;
};

Ingredients.propTypes = {
  type: PropTypes.string.isRequired
};

export default Ingredients;
