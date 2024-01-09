import "./App.css";
import { useEffect, useState } from "react";

const url = "https://openlibrary.org/search.json";

function App() {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("");

  const fetchBooks = async (query) => {
    try {
      const response = await fetch(`${url}?q=${query}`);
      const { numFound, docs, start } = await response.json();
      setBooks((prev) => [...prev, ...docs]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchString) {
      const query = searchString.split(" ").join("+");
      fetchBooks(query);
    }
  }, [searchString]);

  const onChange = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="App">
      <input onChange={onChange} />

      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}

export default App;
