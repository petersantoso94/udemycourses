import React from "react";
import Person from "./Person";

const PersonList = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map((el, idx) => {
        return (
          <Person
            deletePerson={deletePerson}
            name={el.name}
            age={el.age}
            key={idx}
            idx={idx}
          />
        );
      })}
    </>
  );
};

export default PersonList;
