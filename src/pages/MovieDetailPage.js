import React from "react";
import { useParams } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MoviesCard from "../components/movie/MoviesCard";
import { fetcher, tmdbAPI } from "../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  if (!data) return null;

  const { backdrop_path, overview, title, genres } = data;

  return (
    <div className="py-20">
      <div className=" w-full h-[600px] relative  ">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(backdrop_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl "
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>

      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border border-primary text-primary rounded-md"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed max-w-[1000px] mx-auto">
        {overview}
      </p>
      <MovieVideos />
      <MovieCredits />
      <MovieSimilar />
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  return (
    <div>
      <h2 className="text-center text-3xl mb-10 mt-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.splice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-center text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;

  return (
    <div className="py-10">
      {data?.results?.splice(0, 1).map((item) => (
        <div key={item.id} className="w-full aspect-video">
          <iframe
            width="885"
            height="498"
            src={`https://www.youtube.com/embed/${item.key}`}
            title={item.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-fill"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  console.log(
    "???? ~ file: MovieDetailPage.js ~ line 127 ~ MovieSimilar ~ data",
    data
  );
  if (!data) return null;
  const { results } = data;

  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
      <div className="movie-list select-none">
        <Swiper
          spaceBetween={30}
          grabCursor={"true"}
          slidesPerView={"auto"}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MoviesCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailPage;
