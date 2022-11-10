import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import MoviesCard from "./MoviesCard";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  return (
    <div className="movie-list select-none">
      <Swiper
        spaceBetween={30}
        grabCursor={"true"}
        slidesPerView={"auto"}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MoviesCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
