import "./App.css";
import { useEffect, useState } from "react";

import BooksList from "./components/BooksList";
import useDebounce from "./hooks/useDebounce";

const url = "https://openlibrary.org/search.json";

const limit = 20;

function App() {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { debouncedSearchString } = useDebounce(searchString);

  const fetchBooks = async (query) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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

  return (
    <div>
      <form className="formContainer">
        <input className="searchInput" onChange={onChange} />
        <button className="searchButton">Search</button>
      </form>

      {isLoading ? "Loading..." : <BooksList books={books} />}
    </div>
  );
}

export default App;
