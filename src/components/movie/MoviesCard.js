import React from "react";

const MoviesCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path } = item;
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 mb-10 text-white h-full">
      <div className="flex flex-col flex-1">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt=""
          className="w-full h-[250px] object-cover rounded-lg mb-5 hover:scale-105 transition-all ease-linear hover:opacity-60"
        />
        <h3 className=" text-xl font-bold mb-3 text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto">
          watch
        </button>
      </div>
    </div>
  );
};

export default MoviesCard;