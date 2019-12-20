import React, { useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log("submitted");
          const resp = await login({
            variables: {
              email,
              password
            }
          });
          history.push("/");
          if (resp && resp.data) {
            setAccessToken(resp.data.login.accessToken);
          }
          console.log(resp);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
