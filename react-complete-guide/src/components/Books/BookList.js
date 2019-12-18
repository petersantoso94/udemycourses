import React, { memo, useRef } from "react";
import Book from "./Book";

const BookList = memo(({ loading, deleteBook, data, editBook }) => {
  let counter = useRef(0);
  console.log("BookList rendered:", counter.current++);

  if (loading) return <h3>Loading...</h3>;

  const child = data.books.map(book => (
    <Book
      key={book.id}
      delete={deleteBook}
      idx={book.id}
      name={book.name}
      author={book.author}
      editBook={editBook}
    />
  ));
  return <>{child}</>;
});

export default BookList;
