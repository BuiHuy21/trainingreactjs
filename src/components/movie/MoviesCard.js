import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";

const MoviesCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 mb-10 text-white h-full">
      <div className="flex flex-col flex-1">
        <img
          src={tmdbAPI.image500(poster_path)}
          alt=""
          className="w-full h-[250px] object-cover rounded-lg mb-5 hover:scale-105 transition-all ease-linear hover:opacity-60 overflow-hidden "
        />
        <h3 className=" text-xl font-bold mb-3 text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button
          bgColor="secondary"
          onClick={() => {
            navigate(`/movies/${id}`);
          }}
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MoviesCard;
