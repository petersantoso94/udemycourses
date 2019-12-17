import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Tutorial from "./components/Container/Tutorial";
import Library from "./components/Container/Library";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL + "/graphql",
  credentials: "include"
});

function App() {
  // let counter = useRef(0);
  // console.log("App rendered:", counter.current++);
  const [showTutorial, setShowTutorial] = useState(() => false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h3>React tutorials point</h3>
          <img src={logo} className="App-logo" alt="logo react" width="100px" />
          <hr></hr>
          <Library />
          <hr></hr>
          <button onClick={() => setShowTutorial(cur => !cur)}>
            {showTutorial ? "Hide" : "Show"} tutorial
          </button>
          {showTutorial ? (
            <>
              <Tutorial />
            </>
          ) : null}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
