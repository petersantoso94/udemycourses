// import React, { useEffect, useState } from "react";
// import Modal from "../../components/UI/Modal/Modal";

// const WithErrorHandler = (WrappedComponent, axios) => props => {
//   const [error, setError] = useState(null);
//   const reqInt = axios.interceptors.request.use(req => {
//     setError(null);
//   });
//   const resInt = axios.interceptors.response.use(null, error => {
//     setError(error);
//   });
//   useEffect(() => {
//     return () => {
//       axios.interceptors.request.eject(reqInt);
//       axios.interceptors.response.eject(resInt);
//     };
//   }, [reqInt, resInt]);
//   return (
//     <>
//       <Modal show={!!error} hide={() => setError(null)}>
//         <p>{error}</p>
//       </Modal>
//       <WrappedComponent {...props} />
//     </>
//   );
// };

// export default WithErrorHandler;

import React from "react";
import Modal from "../../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.reqInt = null;
      this.resInt = null;
    }
    state = {
      error: null
    };

    requestSuccess(config) {
      this.setState({ error: null });
      return config;
    }
    requestFail = error => {
      this.setState({ error: JSON.stringify(error) });
      return Promise.reject(error);
    };
    responseSuccess = response => {
      this.setState({ error: null });
      return Promise.resolve(response);
    };
    responseFail = err => {
      this.setState({ error: err && err.message });
      return Promise.reject(err);
    };

    componentDidMount() {
      this.reqInt = axios.interceptors.request.use(
        config => this.requestSuccess(config),
        err => this.requestFail(err)
      );
      this.resInt = axios.interceptors.response.use(
        response => this.responseSuccess(response),
        error => this.responseFail(error)
      );
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.error === this.state.error) {
        return false;
      }
      console.log("HOC WITH ERROR rendered");
      return true;
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
    }

    hideModalHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal show={!!this.state.error} hide={this.hideModalHandler}>
            <p>{this.state.error}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };

export default WithErrorHandler;
