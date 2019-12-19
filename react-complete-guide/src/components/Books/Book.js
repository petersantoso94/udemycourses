import React, { memo, useRef } from "react";
import { BookContext } from "../../Hooks/context/BookContext";

const Book = memo(props => {
  let counter = useRef(0);
  console.log("Book rendered:", counter.current++);
  return (
    <BookContext.Consumer>
      {({ data, editBook }) => (
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
          onClick={() => editBook(props.idx, data)}
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
      )}
    </BookContext.Consumer>
  );
});

export default Book;
