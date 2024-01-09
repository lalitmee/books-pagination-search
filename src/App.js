import "./App.css";
import { useEffect, useState } from "react";

import BooksList from "./components/BooksList";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
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

  useEffect(() => {
    if (!debouncedSearchString) {
      setPage(0);
    } else {
      setPage(1);
    }
  }, [debouncedSearchString]);

  const onChange = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <form className="formContainer">
        <input className="searchInput" onChange={onChange} />
        <button className="searchButton">Search</button>
      </form>

      {isLoading ? <Loader /> : <BooksList books={books} />}

      <Pagination
        className="paginationBar"
        totalCount={totalResults}
        currentPage={page}
        onPageChange={setPage}
        pageSize={limit}
      />
    </>
  );
}

export default App;
