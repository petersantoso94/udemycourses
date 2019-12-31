import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER
  };
};
const submitOrderFailed = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAIL
  };
};
export const initOrder = () => {
  return {
    type: actionTypes.INIT_ORDER
  };
};
const submitOrderSuccess = payload => {
  return {
    type: actionTypes.SUBMIT_ORDER_SUCCESS,
    payload
  };
};

export const submitOrder = payload => {
  return dispatch => {
    dispatch(submitOrderStart());
    axios
      .post("/orders.json", payload)
      .then(resp => {
        dispatch(submitOrderSuccess({ ...payload, id: resp.data.name }));
      })
      .catch(err => {
        console.log(err);
        dispatch(submitOrderFailed());
      });
  };
};
