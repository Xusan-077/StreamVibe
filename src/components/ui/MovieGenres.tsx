"use client";

import { icons } from "@/constants/icons";
import { API } from "@/services/API";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import MovieTypeCard from "./MovieTypeCard";
import Subtitle from "./Subtitle";
import Text from "./Text";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";
import CarouselControler from "./CarouselControler";

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
  const { width } = useWindowSize();
  const [page, setPage] = useState<number>(1);
  const totalPage = width > 768 ? 5 : 2;

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

  const isAllLoading = results.some((result) => result.isLoading);

  const start = (page - 1) * totalPage;
  const end = start + totalPage;

  const pagination = movieActions.slice(start, end);
  const maxPages = Math.ceil(movieActions.length / totalPage);

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
          <CarouselControler
            maxPages={maxPages}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>

      <div className="">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.ul
              key={page}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-5 gap-7.5 max-[1200px]:grid-cols-4 max-[960px]:grid-cols-3 max-[768px]:grid-cols-2"
            >
              {pagination.map((group, index) => (
                <li key={group.type || index}>
                  {group.isLoading ? (
                    <div className="h-64 bg-[#1A1A1A] animate-pulse rounded-2xl border border-[#262626]" />
                  ) : (
                    <MovieTypeCard
                      inTop={!!top}
                      isLoading={isAllLoading}
                      groupMovies={group.movies}
                      type={group.type}
                    />
                  )}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
        <div className="hidden  max-[768px]:flex bg-[#0F0F0F] items-center max-[768px]:justify-between mt-5 gap-4 p-4 rounded-lg">
          <CarouselControler
            maxPages={maxPages}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
