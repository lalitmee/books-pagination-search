import React from "react";

const placeholderSrc = "../assets/images/book-placeholder.png";

const BookImage = ({ src, ...props }) => {
  const handleError = (e) => {
    e.target.src = placeholderSrc;
  };

  return (
    <img
      src={src}
      className="bookImage"
      alt={props.alt || ""}
      onError={handleError}
    />
  );
};

export default BookImage;
