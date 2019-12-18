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
        margin: "2px",
        position: "relative",
        padding: "20px"
      }}
      onClick={() => props.editBook(props.idx)}
    >
      <p style={{ marginRight: "50px" }}>Book name: {props.name}</p>
      <p style={{ marginRight: "50px" }}>Book author: {props.author}</p>
      <button
        style={{
          fontSize: "20px",
          position: "absolute",
          right: "0px",
          top: "0px"
        }}
        onClick={() => props.delete(props.idx, props.name)}
      >
        X
      </button>
    </div>
  );
});

export default Book;
