import "./App.css";
import { useCallback, useEffect, useState } from "react";

import BooksList from "./components/BooksList";
import Pagination from "./components/Pagination";
import useDebounce from "./hooks/useDebounce";
import useBooks from "./hooks/useBooks";

const limit = 20;

function App() {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);

  const { debouncedSearchString } = useDebounce(searchString);

  const { books, totalResults, isLoading } = useBooks({
    searchString: debouncedSearchString,
    limit,
    page,
  });

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
