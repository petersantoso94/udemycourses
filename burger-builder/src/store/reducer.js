import * as typeName from "./actions";

const initialState = { ingredients: {}, ingredientsPrices: {}, price: 0 };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.SAVE_SELECTED_INGREDIENTS:
      return { ...state, ingredients: payload.ingredients };
    case typeName.INITIATE_INGREDIENTS_AND_PRICE:
      return {
        ...state,
        ...payload
      };
    case typeName.ADD_CHOSEN_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.type]: state.ingredients[payload.type] + 1
        },
        price: state.price + state.ingredientsPrices[payload.type]
      };
    case typeName.REMOVE_ONE_CHOSEN_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.type]: state.ingredients[payload.type] - 1
        },
        price: state.price + state.ingredientsPrices[payload.type]
      };
    default:
      return state;
  }
};
