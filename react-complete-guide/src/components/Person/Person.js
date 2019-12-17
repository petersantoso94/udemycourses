import React, { useState, useEffect, useRef, memo } from "react";

// set globally wont affect each state change, but it is better to put it within function scope
// let isMounted = true;

const Person = memo(({ name, age, deletePerson, idx }) => {
  const [state, setState] = useState(() => true);
  // use useRef so it persist within the state change
  let isMounted = useRef(true);
  //   let isMounted = true;
  let counter = useRef(0);
  console.log(name + " : " + counter.current++);
  console.log(name + " outside isMounted: ", isMounted);

  useEffect(() => {
    return () => {
      // when element unmount
      isMounted.current = false;
      console.log(name + " unmount", isMounted.current);
      //   isMounted = false;

      //   console.log("counter from unmount", counter.current);
      //   console.log("unmount", isMounted);
    };
  }, []);

  return (
    <div>
      {state ? "loading.." : "finished!"}
      <p>
        im {name} and {age} years old
      </p>
      <button
        onClick={() =>
          setTimeout(() => {
            console.log("onclick finished", isMounted.current);
            if (isMounted.current) setState(false);
            // console.log("counter from click", counter.current);
            // console.log("onclick finished", isMounted);
            // if (isMounted) setState(false);
          }, 2000)
        }
      >
        finish
      </button>
      <button onClick={() => deletePerson(idx)}>remove</button>
    </div>
  );
});

export default Person;
