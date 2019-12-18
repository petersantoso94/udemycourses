import React, { memo, useRef, useContext } from "react";
import Book from "./Book";
import { BookContext } from "../../Hooks/context/BookContext";

const BookList = memo(({ loading, deleteBook, editBook }) => {
  let counter = useRef(0);
  console.log("BookList rendered:", counter.current++);

  const data = useContext(BookContext);

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
