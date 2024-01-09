import React, { useState } from "react";

import BookImage from "./BookImage";

function Book({ book }) {
  const [showAuthor, setShowAuthor] = useState(false);

  const { isbn, oclc, lccn, id, title, first_publish_year, author_name } = book;
  let key = "";
  let value = "";
  if (isbn && isbn.length > 0) {
    key = "isbn";
    value = isbn[0];
  } else if (oclc && oclc.length > 0) {
    key = "oclc";
    value = oclc[0];
  } else if (lccn && lccn.length > 0) {
    key = "lccn";
    value = lccn[0];
  }

  // need to work on this
  const onHover = () => {
    setShowAuthor(true);
  };

  return (
    <div key={id} className="bookContainer" onMouseEnter={onHover}>
      <div className="bookImageContainer">
        <BookImage
          src={`https://covers.openlibrary.org/b/${key}/${value}-S.jpg`}
          alt={title}
        />
      </div>
      <div className="bookDetails">
        <div className="bookTitle">
          {title} ({first_publish_year})
        </div>
        <div className="bookAuthor">{author_name[0]}</div>
      </div>
    </div>
  );
}

export default Book;
