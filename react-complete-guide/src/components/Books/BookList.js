import React from "react";
import Book from "./Book";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_BOOKS = gql`
  {
    books {
      id
      name
      author
    }
  }
`;

const BookList = props => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return <h3>Loading...</h3>;
  if (error) {
    localStorage.removeItem("isLogin");
    props.setIsLogin(false);
    return `Error! ${error.message}`;
  }
  return (
    <>
      {data.books.map(book => (
        <Book
          key={book.id}
          idx={book.id}
          name={book.name}
          author={book.author}
        />
      ))}
    </>
  );
};

export default BookList;
