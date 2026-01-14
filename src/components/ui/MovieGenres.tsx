"use client";

import { API } from "@/services/API";
import { useQueries } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import MovieTypeCard from "./MovieTypeCard";
import Subtitle from "./Subtitle";
import Text from "./Text";
import CarouselControler from "./CarouselControler";
import useEmblaCarousel from "embla-carousel-react";

interface IMovie_genres {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  API_URL: string;
  Key: string;
  title: string;
  inMovie?: boolean;
  top?: boolean;
}

export default function MovieGenres({
  API_URL,
  Key,
  inMovie,
  title,
  top,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 5,
    skipSnaps: false,
    breakpoints: {
      "(max-width: 1024px)": { slidesToScroll: 2 },
      "(max-width: 640px)": { slidesToScroll: 1 },
    },
  });

  const MOVIE_GENRES: IMovie_genres[] = [
    { id: 28, name: "Action", slug: "action" },
    { id: 12, name: "Adventure", slug: "adventure" },
    { id: 16, name: "Animation", slug: "animation" },
    { id: 35, name: "Comedy", slug: "comedy" },
    { id: 80, name: "Crime", slug: "crime" },
    { id: 99, name: "Documentary", slug: "documentary" },
    { id: 18, name: "Drama", slug: "drama" },
    { id: 10751, name: "Family", slug: "family" },
    { id: 14, name: "Fantasy", slug: "fantasy" },
    { id: 36, name: "History", slug: "history" },
    { id: 27, name: "Horror", slug: "horror" },
    { id: 10402, name: "Music", slug: "music" },
    { id: 9648, name: "Mystery", slug: "mystery" },
    { id: 10749, name: "Romance", slug: "romance" },
    { id: 878, name: "Sci-Fi", slug: "sci-fi" },
    { id: 10770, name: "TV Movie", slug: "tv-movie" },
    { id: 53, name: "Thriller", slug: "thriller" },
    { id: 10752, name: "War", slug: "war" },
    { id: 37, name: "Western", slug: "western" },
  ];

  const results = useQueries({
    queries: MOVIE_GENRES.map((genre) => ({
      queryKey: [Key, genre.id],
      queryFn: async () => {
        const res = await API.get(
          `/discover/movie?with_genres=${genre.id}${API_URL}&language=en-US`
        );
        return res.data;
      },
      staleTime: 1000 * 60 * 60,
    })),
  });

  const movieActions = MOVIE_GENRES.map((genre, index) => {
    return {
      type: genre.name,
      movies: results[index]?.data?.results?.slice(0, 4) || [],
      isLoading: results[index].isLoading,
    };
  });

  return (
    <div className={`${inMovie ? "" : "mb-37.5 max-[640px]:mb-25"}`}>
      <div className=" mb-20 items-center max-[640px]:mb-10 gap-20 flex justify-between">
        {inMovie ? (
          <Subtitle text={title} />
        ) : (
          <div className="">
            <Subtitle text="Explore our wide variety of categories" />
            <Text text="Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new" />
          </div>
        )}

        <div className="max-[768px]:hidden bg-[#0F0F0F] flex items-center gap-4 p-4 rounded-lg">
          <CarouselControler emblaApi={emblaApi} />
        </div>
      </div>

      <div className="">
        <div className="overflow-hidden" ref={emblaRef}>
          <ul className="flex gap-5">
            {movieActions.map((group, index) => (
              <li
                key={group.type || index}
                className="min-w-0 flex-[0_0_18%] max-[1200px]:flex-[0_0_25%] max-[900px]:flex-[0_0_50%] "
              >
                {group.isLoading ? (
                  <div className="h-64 bg-[#1A1A1A] animate-pulse rounded-2xl border border-[#262626]" />
                ) : (
                  <MovieTypeCard
                    inTop={!!top}
                    groupMovies={group.movies}
                    type={group.type}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <div className="hidden max-[768px]:flex bg-[#0F0F0F] items-center max-[768px]:justify-end mt-5 gap-4 p-4 rounded-lg">
            <CarouselControler emblaApi={emblaApi} />
          </div>
        </div>
      </div>
    </div>
  );
}
