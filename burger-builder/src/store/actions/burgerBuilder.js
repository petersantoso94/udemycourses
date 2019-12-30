import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";
import { ingredientType } from "../../components/Burger/Ingredients/Ingredients";

const _setInitValue = payload => {
  return { type: actionTypes.INITIATE_INGREDIENTS_AND_PRICE, payload };
};

export const setInitValue = payload => {
  return dispatch => {
    let ingredients = {};
    let ingredientsPrices = {};
    let price = payload.price;
    axios
      .get("/ingredients.json")
      .then(res => {
        Object.keys(res.data).forEach(key => {
          ingredients[key] = res.data[key];
          ingredientsPrices[key] = Math.ceil(Math.random() * 10, 2);
          price += ingredients[key] * ingredientsPrices[key];
        });
        dispatch(
          _setInitValue({ ingredients, ingredientsPrices, ...payload, price })
        );
      })
      .catch(err => {
        // give default value in case the server error
        console.error(err);
        Object.keys(ingredientType).forEach(key => {
          ingredients[key] = 0;
          ingredientsPrices[key] = Math.ceil(Math.random() * 10, 2);
        });
        dispatch(_setInitValue({ ingredients, ingredientsPrices, ...payload }));
      });
  };
};
