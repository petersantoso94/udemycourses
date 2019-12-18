import { useState } from "react";

export const useForm = initState => {
  const [value, setValue] = useState(initState);

  return [
    value,
    e => {
      //on click handler
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    () => {
      //reset
      setValue({ ...initState });
    },
    newValue => {
      //set all value
      setValue({ ...newValue });
    }
  ];
};
