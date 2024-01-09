import "./App.css";
import { useEffect, useState } from "react";

const url = "https://openlibrary.org/search.json";

const limit = 20;

function App() {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [debouncedSearchString, setDebouncedSearchString] = useState("");
  const [offset, setOffset] = useState(0);
  const [showAuthor, setShowAuthor] = useState(false);

  const fetchBooks = async (query) => {
    try {
      const response = await fetch(
        `${url}?q=${query}&offset=${offset}&limit=${limit}`,
      );
      const { docs } = await response.json();
      setBooks((prev) => {
        if (offset) {
          return [...prev, ...docs];
        }
        return docs;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchString(searchString);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchString]);

  useEffect(() => {
    if (debouncedSearchString) {
      const query = debouncedSearchString.split(" ").join("+");
      fetchBooks(query);
    } else {
      setBooks([]);
    }
  }, [debouncedSearchString]);

  const onChange = (e) => {
    setSearchString(e.target.value);
  };

  // need to work on this
  const onHover = () => {
    setShowAuthor(true);
  };

  return (
    <div>
      <input className="searchBox" onChange={onChange} />

      <div className="booksList">
        {books.map((book) => {
          const { isbn, oclc, lccn, id, title } = book;
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
          return (
            <div key={id} className="bookContainer" onMouseEnter={onHover}>
              <img
                className="bookImage"
                src={`https://covers.openlibrary.org/b/${key}/${value}-S.jpg`}
                alt={title}
              />
              {showAuthor && (
                <div className="bookAuthor">
                  <img
                    className="bookAuthor"
                    src={`https://covers.openlibrary.org/a/${key}/${value}-$size.jpg`}
                    alt={title}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
