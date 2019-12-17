import React, { memo, useRef, useState } from "react";
import PersonList from "../Person/PersonList";
import { useForm } from "../../Hooks/useForm";

const Tutorial = memo(() => {
  let counter = useRef(0);
  console.log("Tutorial rendered:", counter.current++);
  const [persons, setPersons] = useState(() => [
    {
      name: "peter",
      age: "25"
    }
  ]);

  const [formval, handler] = useForm({ password: "24", username: "yulia" });

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
    <div>
      <p>{JSON.stringify(formval)}</p>
      <input name="username" value={formval.username} onChange={handler} />
      <input name="password" value={formval.password} onChange={handler} />
      <button onClick={addPerson}>add person</button>
      <PersonList persons={persons} deletePerson={deletePerson} />
    </div>
  );
});

export default Tutorial;
