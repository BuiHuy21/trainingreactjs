import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MoviesCard from "../components/movie/MoviesCard";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;
// "https://api.themoviedb.org/3/search/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d"
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [filter, setFilter] = useState("");
  const [pages, setPages] = useState(1);

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&page=${pages}`
  );

  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChangeInput = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&query=${filterDebounce}&page=${pages}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&page=${pages}`
      );
    }
  }, [filterDebounce, pages]);
  const moviesPage = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPages(event.selected + 1);
  };

  return (
    <div className="py-10 px-5 ">
      <div className="flex mb-10 max-w-2xl m-auto">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white"
            placeholder="Type here to search ... "
            onChange={handleFilterChangeInput}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10 ">
        {!loading &&
          moviesPage.length > 0 &&
          moviesPage.map((movie) => <MoviesCard key={movie.id} item={movie} />)}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginition"
        />
      </div>
    </div>
  );
};

export default MoviePage;
