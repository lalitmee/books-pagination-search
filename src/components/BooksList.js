import React from "react";

import Book from "./Book";

function BooksList({ books }) {
  return (
    <div className="booksList">
      {books.map((book) => {
        return <Book book={book} />;
      })}
    </div>
  );
}

export default BooksList;
