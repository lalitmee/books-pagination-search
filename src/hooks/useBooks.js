import { useCallback, useEffect, useState } from "react";

const url = "https://openlibrary.org/search.json";

export default function useBooks({ searchString, limit, page }) {
  const [totalResults, setTotalResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(
    async (query, page) => {
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
    },
    [limit],
  );

  useEffect(() => {
    if (searchString) {
      const query = searchString.split(" ").join("+");
      fetchBooks(query, page);
    } else {
      setBooks([]);
    }
  }, [searchString, fetchBooks, page]);

  return { books, totalResults, isLoading };
}
