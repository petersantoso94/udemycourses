import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

const Register: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log("submitted");
          const resp = await register({
            variables: {
              email,
              password
            }
          });
          history.push("/");
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
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register;
