import React, { useRef, memo, useEffect, useState, useCallback } from "react";
import Book from "./Book";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const BookList = memo(({ loading, deleteBook, data }) => {
  //   let counter = useRef(0);
  //   console.log("BookList rendered:", counter.current++);

  if (loading) return <h3>Loading...</h3>;

  const child = data.books.map(book => (
    <Book
      key={book.id}
      delete={deleteBook}
      idx={book.id}
      name={book.name}
      author={book.author}
    />
  ));
  return <>{child}</>;
});

export default BookList;
