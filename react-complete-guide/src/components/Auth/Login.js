import React, { useRef } from "react";
import { useForm } from "../../Hooks/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGIN = gql`
  mutation Login($email: String!, $pass: String!) {
    login(input: { email: $email, password: $pass }) {
      user {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

const Login = props => {
  let counter = useRef(0);
  console.log("Login rendered:", counter.current++);
  const [formval, handler] = useForm({ password: "", email: "" });
  const [
    login,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(LOGIN);
  const loginHandler = event => {
    event.preventDefault();
    login({ variables: { email: formval.email, pass: formval.password } }).then(
      data => {
        console.log("graphql data", data);
        if (data && data.data && data.data.login && data.data.login.user) {
          localStorage.setItem("isLogin", "true");
          props.setIsLogin(true);
        }
      }
    );
  };
  return (
    <div>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Internal Server Error :( Please try again</p>}
      <form>
        <input
          type="text"
          name="email"
          value={formval.email}
          onChange={handler}
        />
        <input
          type="password"
          name="password"
          value={formval.password}
          onChange={handler}
        />
        <button type="button" onClick={loginHandler}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
