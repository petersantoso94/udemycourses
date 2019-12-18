import React, { useState, useRef, memo, useEffect, useCallback } from "react";
import Login from "../Auth/Login";
import BookList from "../Books/BookList";
import BookInput from "../Books/BookInput";
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

const EDIT_BOOK = gql`
  mutation EditBook($id: Float!, $book: SearchBookInput!) {
    editBook(id: $id, book: $book) {
      book {
        id
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

const Library = memo(props => {
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
  const [isSuccessEdit, setIsSuccessEdit] = useState(() => "");
  const [formval, handler, reset] = useForm({ author: "", name: "" });
  const [status, setStatus] = useState(() => "Add");
  const [selectedIdx, setSelectedIdx] = useState(() => -1);

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

  const deleteBook = useCallback(
    (idx, name) => {
      deleteBookMutation({ variables: { id: idx } }).then(resp => {
        if (resp.data && resp.data.deleteBook && resp.data.deleteBook.book) {
          setIsSuccess(name);
          timeout = setTimeout(() => {
            setIsSuccess("");
          }, 1000);
        } else console.log(resp.data.deleteBook.errors.message);
      });
    },
    [data]
  );
  // END OF DELETE BOOK

  // EDIT BOOK
  const [
    editBookMutation,
    { loading: editMutationLoading, error: editMutationError }
  ] = useMutation(EDIT_BOOK, {
    update(cache, data) {
      if (data.data && data.data.editBook && data.data.editBook.book) {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        let newBooks = books.map(book => {
          if (book.id === data.data.editBook.book.id) {
            return data.data.editBook.book;
          }
          return book;
        });

        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: [...newBooks] }
        });
      }
    }
  });

  const editBook = useCallback(
    idx => {
      setStatus("Edit");
      setSelectedIdx(idx);
      const selectedBook = data.books.filter(book => book.id === idx)[0];
      formval.name = selectedBook.name;
      formval.author = selectedBook.author;
      // handler({ target: { name: "name", value: selectedBook.name } });
      // handler({ target: { name: "author", value: selectedBook.author } });
    },
    [data]
  );

  const submitEditBook = e => {
    e.preventDefault();
    const idx = selectedIdx;
    editBookMutation({
      variables: {
        id: idx,
        book: { name: formval.name, author: formval.author }
      }
    }).then(resp => {
      if (resp.data && resp.data.editBook && resp.data.editBook.book) {
        setIsSuccessEdit(formval.name);
        timeout = setTimeout(() => {
          setIsSuccessEdit("");
        }, 1000);
        setStatus("Add");
      } else console.log(resp.data.editBook.errors.message);
    });
  };
  // END OF EDIT BOOK

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
      } else {
        console.log(data.data.newBook.errors);
      }
    });
  };
  //END OF ADD BOOK

  const child = isLogin ? (
    <>
      <BookInput
        addBook={
          status.toLocaleLowerCase() === "add" ? addBook : submitEditBook
        }
        formval={formval}
        reset={reset}
        handler={handler}
        type={status}
      />
      <BookList
        setIsLogin={setIsLogin}
        loading={loading}
        deleteBook={deleteBook}
        editBook={editBook}
        data={data}
      />
    </>
  ) : (
    <Login setIsLogin={setIsLogin} />
  );
  return (
    <div>
      <h4>Graphql books library</h4>
      <p style={{ fontSize: "12px" }}>*click on the list to edit</p>

      {isSuccessAdd && (
        <p style={{ backgroundColor: "green" }}>Success Adding New Book!</p>
      )}
      {isSuccess && (
        <p style={{ backgroundColor: "green" }}>
          Success Deleting {isSuccess}!
        </p>
      )}
      {isSuccessEdit && (
        <p style={{ backgroundColor: "green" }}>
          Success Editing {isSuccessEdit}!
        </p>
      )}
      {mutationLoading && <p>Deleting...</p>}
      {addBookLoading && <p>Adding...</p>}
      {editMutationLoading && <p>Editing...</p>}
      {mutationError && <p>Internal Server Error :( Please try delete again</p>}
      {addBookError && <p>Internal Server Error :( Please try add again</p>}
      {editMutationError && (
        <p>Internal Server Error :( Please try edit again</p>
      )}
      {child}
    </div>
  );
});

export default Library;
