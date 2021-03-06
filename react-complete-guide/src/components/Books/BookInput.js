import React, { memo } from "react";

const BookInput = memo(({ addBook, formval, reset, handler, type }) => {
  //   let counter = useRef(0);
  //   console.log("AddBook rendered:", counter.current++);
  //

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          value={formval.name}
          onChange={handler}
        />
        <input
          type="text"
          name="author"
          value={formval.author}
          onChange={handler}
        />
        <button
          type="button"
          onClick={e => {
            addBook(e);
            reset();
          }}
        >
          {type} Book
        </button>
      </form>
    </div>
  );
});

export default BookInput;
