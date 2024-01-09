import "./App.css";
import { useCallback, useEffect, useState } from "react";

import BooksList from "./components/BooksList";
import Pagination from "./components/Pagination";
import useDebounce from "./hooks/useDebounce";

const url = "https://openlibrary.org/search.json";

const limit = 20;

function App() {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { debouncedSearchString } = useDebounce(searchString);

  const fetchBooks = useCallback(async (query, page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${url}?q=${query}&limit=${limit}&page=${page}`,
      );
      const { docs, numFound } = await response.json();
      setBooks(docs);
      setTotalResult(numFound);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchString) {
      const query = debouncedSearchString.split(" ").join("+");
      fetchBooks(query, page);
    } else {
      setBooks([]);
    }
  }, [debouncedSearchString, fetchBooks, page]);

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

      <Pagination
        className="paginationBar"
        totalCount={totalResults}
        currentPage={page}
        onPageChange={setPage}
        pageSize={limit}
      />
    </div>
  );
}

export default App;
