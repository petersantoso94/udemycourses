import * as ActionType from "../actions";

const initialState = {
  counter: 0
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionType.INCREMENT_BY:
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
};
