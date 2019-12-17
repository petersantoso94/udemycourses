import React, { memo } from "react";
import { useForm } from "../../Hooks/useForm";

const AddBook = memo(({ addBook }) => {
  //   let counter = useRef(0);
  //   console.log("AddBook rendered:", counter.current++);
  //
  const [formval, handler, reset] = useForm({ author: "", name: "" });

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
            addBook(e, formval);
            reset();
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
});

export default AddBook;
