import { useState } from "react";

export const UseForm = initialVal => {
  const [state, setState] = useState(initialVal);
  return [
    state,
    e => {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  ];
};
