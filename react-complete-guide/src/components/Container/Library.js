import React, { useState, useRef, memo, useEffect } from "react";
import Login from "../Auth/Login";
import BookList from "../Books/BookList";
import AddBook from "../Books/AddBook";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "../../Hooks/useForm";

const GET_BOOKS = gql`
  {
    books {
      id
      name
      author
    }
  }
`;

const DELETE_BOOKS = gql`
  mutation DeleteBook($id: Float!) {
    deleteBook(id: $id) {
      book {
        name
        author
      }
      errors {
        path
        message
      }
    }
  }
`;

const ADD_NEW_BOOK = gql`
  mutation NewBook($author: String!, $name: String!) {
    newBook(options: { author: $author, name: $name }) {
      book {
        name
        id
        author
      }
      errors {
        path
        message
      }
    }
  }
`;

const Library = memo(() => {
  let counter = useRef(0);
  console.log("Library rendered:", counter.current++);
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem("isLogin"));
  let timeout;
  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);
  const [isSuccess, setIsSuccess] = useState(() => "");
  const [isSuccessAdd, setIsSuccessAdd] = useState(() => false);
  const [formval, handler, reset] = useForm({ author: "", name: "" });

  // GET BOOK
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (error) {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    console.log(error.message);
    return `Error! ${error.message}`;
  }
  //END OF GET BOOK

  // DELETE BOOK
  const [
    deleteBookMutation,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(DELETE_BOOKS, {
    update(cache, data) {
      if (data.data && data.data.deleteBook && data.data.deleteBook.book) {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        let newBooks = books.filter(
          book => book.name !== data.data.deleteBook.book.name
        );

        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: newBooks }
        });
      }
    }
  });

  const deleteBook = (idx, name) => {
    deleteBookMutation({ variables: { id: idx } }).then(resp => {
      if (resp.data && resp.data.deleteBook && resp.data.deleteBook.book) {
        setIsSuccess(name);
        timeout = setTimeout(() => {
          setIsSuccess("");
        }, 1000);
      } else console.log(resp.data.deleteBook.errors.message);
    });
  };
  // END OF DELETE BOOK

  // ADD BOOK
  const [
    addBookQuery,
    { loading: addBookLoading, error: addBookError }
  ] = useMutation(ADD_NEW_BOOK, {
    update(cache, data) {
      if (data.data && data.data.newBook && data.data.newBook.book) {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: [...books, data.data.newBook.book] }
        });
      }
    }
  });

  const addBook = e => {
    e.preventDefault();
    addBookQuery({
      variables: { author: formval.author, name: formval.name }
    }).then(data => {
      if (data && data.data && data.data.newBook && data.data.newBook.book) {
        // success insert
        setIsSuccessAdd(true);
        timeout = setTimeout(() => {
          setIsSuccessAdd(false);
        }, 1000);
        reset();
      } else {
        console.log(data.data.newBook.errors);
      }
    });
  };
  //END OF ADD BOOK

  const child = isLogin ? (
    <>
      <AddBook addBook={addBook} formval={formval} handler={handler} />
      <BookList
        setIsLogin={setIsLogin}
        loading={loading}
        deleteBook={deleteBook}
        data={data}
      />
    </>
  ) : (
    <Login setIsLogin={setIsLogin} />
  );
  return (
    <div>
      <h4>Graphql books library</h4>
      <p style={{ fontSize: "12px" }}>*click on the list to delete</p>

      {isSuccessAdd && <p>Success Adding New Book!</p>}
      {isSuccess && <p>Success Deleting {isSuccess}!</p>}
      {mutationLoading && <p>Deleting...</p>}
      {addBookLoading && <p>Adding...</p>}
      {mutationError && <p>Internal Server Error :( Please try delete again</p>}
      {addBookError && <p>Internal Server Error :( Please try add again</p>}
      {child}
    </div>
  );
});

export default Library;
