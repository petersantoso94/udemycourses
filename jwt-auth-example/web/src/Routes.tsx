import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useLogoutMutation } from "./generated/graphql";
import { setAccessToken } from "./accessToken";

export const Routes: React.FC = () => {
  const [logout, { client }] = useLogoutMutation();
  return (
    <BrowserRouter>
      <header>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/">Home</Link>
        <br />
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client?.resetStore();
          }}
        >
          logout
        </button>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};
