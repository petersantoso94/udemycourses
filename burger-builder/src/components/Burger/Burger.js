import React, { useRef } from "react";
import "./Burger.css";
import Ingredients, {
  ingredientType,
  breadType
} from "./Ingredients/Ingredients.js";
import PropTypes from "prop-types";

const Burger = props => {
  const counter = useRef(0);
  console.log("Burger rendered: ", counter.current++);
  let ingredients = Object.keys(props.ingredients)
    .map(ig => {
      return [...Array(props.ingredients[ig])].map((_, idx) => (
        <Ingredients type={ingredientType[ig]} key={idx + ig} />
      ));
    })
    .reduce((prev, cur) => {
      return prev.concat(cur);
    }, []);
  if (ingredients.length === 0)
    ingredients = <p>Please add some ingredients</p>;
  return (
    <div className="Burger">
      <Ingredients type={breadType.BREAD_TOP} />
      {ingredients}
      <Ingredients type={breadType.BREAD_BOTTOM} />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default Burger;
