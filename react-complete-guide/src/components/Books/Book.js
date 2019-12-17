import React, { memo } from "react";

const Book = memo(props => {
  //   let counter = useRef(0);
  //   console.log("Book rendered:", counter.current++);
  return (
    <div
      style={{
        width: "500px",
        boxShadow: "2px 2px 2px",
        fontSize: "20px",
        backgroundColor: "white",
        color: "black",
        margin: "2px"
      }}
      onClick={() => props.delete(props.idx, props.name)}
    >
      <p>Book name: {props.name}</p>
      <p>Book author: {props.author}</p>
    </div>
  );
});

export default Book;
