import { useState } from "react";

export const useForm = initState => {
  const [value, setValue] = useState(initState);

  return [
    value,
    e => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    () => {
      setValue({ ...initState });
    }
  ];
};
