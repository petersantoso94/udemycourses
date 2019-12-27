import React, { Component } from "react";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import { connect } from "react-redux";
import * as ActionType from "../../store/actions";

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return {
            counter: prevState.counter + 1
          };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return {
            counter: prevState.counter - 1
          };
        });
        break;
      case "add":
        this.setState(prevState => {
          return {
            counter: prevState.counter + value
          };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return {
            counter: prevState.counter - value
          };
        });
        break;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.counter} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={() => this.counterChangedHandler("dec")}
        />
        <CounterControl
          label="Add 5"
          clicked={() => this.props.onIncrementBy(5)}
        />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.counterChangedHandler("sub", 5)}
        />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.counter)}>
          {" "}
          Store Result
        </button>
        <ul>
          {this.props.result.map((res, idx) => (
            <li key={idx} onClick={() => this.props.onDeleteResult(idx)}>
              {res}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counterReducer.counter,
    result: state.resultReducer.result
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onIncrementCounter: () =>
      dispatch({
        type: ActionType.INCREMENT
      }),
    onIncrementBy: value =>
      dispatch({ type: ActionType.INCREMENT_BY, payload: value }),
    onStoreResult: res =>
      dispatch({ type: ActionType.STORE_RESULT, payload: { counter: res } }),
    onDeleteResult: id =>
      dispatch({ type: ActionType.DELETE_RESULT, payload: { id } })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
