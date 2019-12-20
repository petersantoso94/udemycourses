import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(process.env.REACT_APP_GRAPHQL_URL! + "/refresh_token", {
      method: "POST",
      credentials: "include"
    })
      .then(x => x.json())
      .then(y => {
        setLoading(false);
        setAccessToken(y.accessToken);
      });
  }, []);
  if (loading) return <div>loading...</div>;
  return <Routes />;
};

export default App;
