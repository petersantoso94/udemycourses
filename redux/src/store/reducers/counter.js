import * as ActionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  counter: 0
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionType.INCREMENT_BY:
      return updateObject(state, { counter: state.counter + action.payload });
    default:
      return state;
  }
};
