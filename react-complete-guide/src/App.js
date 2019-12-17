import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { useForm } from "./Hooks/useForm";
import PersonList from "./components/Person/PersonList";
import ApolloClient from "apollo-boost";
import BookList from "./components/Books/BookList";
import Login from "./components/Auth/Login";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL + "/graphql",
  credentials: "include"
});

function App() {
  const [persons, setPersons] = useState(() => [
    {
      name: "peter",
      age: "25"
    }
  ]);

  const [isLogin, setIsLogin] = useState(() => localStorage.getItem("isLogin"));

  const [formval, handler] = useForm({ password: "24", username: "yulia" });

  useEffect(() => {
    if (persons.length === 0) {
      // setPersons(() => [
      //   {
      //     name: "no-one",
      //     age: "100"
      //   }
      // ]);
    }
  }, [persons]);

  const deletePerson = idx => {
    return setPersons(c => {
      c.splice(idx, 1);
      return [...c];
    });
  };

  const addPerson = () => {
    setPersons(currentState => [
      ...currentState,
      {
        name: formval.username,
        age: formval.password
      }
    ]);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h3>React tutorials point</h3>
          <hr></hr>
          <h4>Graphql books library</h4>
          {!isLogin ? <Login setIsLogin={setIsLogin} /> : null}
          {isLogin ? <BookList setIsLogin={setIsLogin} /> : null}
          <hr></hr>
          <img src={logo} alt="logo react" width="100px" />
          <p>{JSON.stringify(formval)}</p>
          <input name="username" value={formval.username} onChange={handler} />
          <input name="password" value={formval.password} onChange={handler} />
          <button onClick={addPerson}>add person</button>
          <PersonList persons={persons} deletePerson={deletePerson} />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
