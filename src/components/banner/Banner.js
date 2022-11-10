import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import useSWR from "swr";
import { fetcher } from "../../config";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d`,
    fetcher
  );
  const movies = data?.results || [];
  console.log(movies);
  return (
    <section className="banner page-container h-[500px] mb-20 overflow-hidden">
      <Swiper
        spaceBetween={30}
        grabCursor={"true"}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, backdrop_path } = item;
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)]"></div>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="w-full left-5 bottom-5 text-white absolute select-none">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="border border-white rounded-md px-4 py-2 cursor-pointer select-none">
            Adventure
          </span>
          <span className="border border-white rounded-md px-4 py-2">
            Action
          </span>
          <span className="border border-white rounded-md px-4 py-2">
            Cartoon
          </span>
        </div>
        <button className="bg-primary text-white rounded-md cursor-pointer px-6 py-3 font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
