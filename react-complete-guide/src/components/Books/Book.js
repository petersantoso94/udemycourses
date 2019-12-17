import React from "react";

const Book = props => (
  <div
    style={{
      width: "500px",
      boxShadow: "2px 2px 2px",
      fontSize: "20px",
      backgroundColor: "white",
      color: "black",
      margin: "2px"
    }}
  >
    <p>Book name: {props.name}</p>
    <p>Book author: {props.author}</p>
  </div>
);

export default Book;
