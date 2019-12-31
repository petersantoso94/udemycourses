import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({ ...payload })
      };
    case actionTypes.SUBMIT_ORDER_FAIL:
      return { ...state, loading: false };
    case actionTypes.INIT_ORDER:
      return { ...state, purchased: false };
    case actionTypes.SUBMIT_ORDER:
      return { ...state, loading: true };
    default:
      return state;
  }
};
