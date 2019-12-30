import * as actionTypes from "./actionTypes";

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  };
};

// const _incrementBy = value => {
//   return { type: INCREMENT_BY, payload: value };
// };

export const incrementBy = value => {
  return (dispatch, getState) => {
    setTimeout(() => {
      //   dispatch(_incrementBy(value));
      console.log("[OLD COUNTER]", getState().counterReducer.counter);
      dispatch({ type: actionTypes.INCREMENT_BY, payload: value });
    }, 2000);
  };
};
