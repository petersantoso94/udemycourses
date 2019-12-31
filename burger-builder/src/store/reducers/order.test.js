import reducer from "./order";
import * as actionTypes from "../actions/actionTypes";

describe("order reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      orders: [],
      loading: false,
      purchased: false
    });
  });
  it("should start loading on initial POST event", () => {
    expect(reducer(undefined, { type: actionTypes.SUBMIT_ORDER })).toEqual({
      orders: [],
      loading: true,
      purchased: false
    });
  });
  it("should stop loading on failed POST event", () => {
    expect(reducer(undefined, { type: actionTypes.SUBMIT_ORDER_FAIL })).toEqual(
      {
        orders: [],
        loading: false,
        purchased: false
      }
    );
  });
});
