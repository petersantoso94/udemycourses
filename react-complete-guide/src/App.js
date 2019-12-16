import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Person from "./components/Person/Person";
import { useForm } from "./Hooks/useForm";
import PersonList from "./components/Person/PersonList";

function App() {
  const [persons, setPersons] = useState(() => [
    {
      name: "peter",
      age: "25"
    }
  ]);

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
    <div className="App">
      <header className="App-header">
        <p>{JSON.stringify(formval)}</p>
        <input name="username" value={formval.username} onChange={handler} />
        <input name="password" value={formval.password} onChange={handler} />
        <button onClick={addPerson}>add person</button>
        <PersonList persons={persons} deletePerson={deletePerson} />
      </header>
    </div>
  );
}

export default App;
