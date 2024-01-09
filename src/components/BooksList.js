import React from "react";

import Book from "./Book";

function BooksList({ books }) {
  return (
    <div className="booksList">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BooksList;
