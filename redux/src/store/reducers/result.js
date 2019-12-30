import * as ActionType from "../actions/actionTypes";

const initialState = {
  result: []
};

export const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.STORE_RESULT:
      return { counter: 0, result: [...state.result, action.payload.counter] };
    case ActionType.DELETE_RESULT:
      const newResult = [...state.result];
      newResult.splice(action.payload.id, 1);
      return { ...state, result: newResult };
    default:
      return state;
  }
};
