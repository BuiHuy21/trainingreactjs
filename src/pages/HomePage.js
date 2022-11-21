import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize mb-10 text-white text-2xl font-bold ">
          Now Playing
        </h2>
        <MovieList type="now_playing" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize mb-10 text-white text-2xl font-bold ">
          Top Rating
        </h2>
        <MovieList type="top_rated" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize mb-10 text-white text-2xl font-bold ">
          Trending
        </h2>
        <MovieList type="upcoming" />
      </section>
    </>
  );
};

export default HomePage;
