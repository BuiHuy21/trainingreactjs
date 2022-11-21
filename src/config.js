export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const APIKEY = "0626a0fd4f115f495c88a11fc9e60310";

const endPoint = "https://api.themoviedb.org/3/movie";

export const tmdbAPI = {
  getMovieList: (type) => `${endPoint}/${type}?api_key=${APIKEY}`,
  getMovieDetail: (movieId) => `${endPoint}/${movieId}?api_key=${APIKEY}`,
  getMovieMeta: (movieId, type) =>
    `${endPoint}/${movieId}/${type}?api_key=${APIKEY}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500${url}`,
};
