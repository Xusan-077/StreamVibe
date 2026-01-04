"use client";

import MovieTypeCard from "@/components/ui/MovieTypeCard";
import Subtitle from "@/components/ui/Subtitle";
import { icons } from "@/constants/icons";
import { API } from "@/services/API";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface IMovie_genres {
  id: number;
  name: string;
  slug: string;
}

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

export default function MoviesPopularGender() {
  const [page, setPage] = useState<number>(1);

  const results = useQueries({
    queries: MOVIE_GENRES.map((genre) => ({
      queryKey: ["genre-popularity", genre.id],
      queryFn: async () => {
        const res = await API.get(
          `/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=en-US`
        );
        return res.data;
      },
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

  const start = (page - 1) * 5;
  const end = start + 5;

  const pagination = movieActions.slice(start, end);

  return (
    <section className={`mb-37.5`}>
      <div className="container">
        <div className="mb-20 flex items-end justify-between">
          <Subtitle text="Popular Top 10 In Genres" />

          <div className="bg-[#0F0F0F] flex items-center gap-4 p-4 rounded-lg">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page == 1}
              className="cursor-pointer bg-[#1A1A1A] disabled:opacity-50 w-14 h-14 rounded-lg flex items-center justify-center"
            >
              <Image src={icons.pre} alt="pre icon" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.ceil(movieActions.length / 5) }).map(
                (_, index) => {
                  const isActive = page === index + 1;

                  return (
                    <div
                      key={index}
                      className={`h-1 transition-all duration-300 rounded-full ${
                        isActive ? "w-6 bg-[#E50000]" : "w-4 bg-[#333333]"
                      }`}
                    ></div>
                  );
                }
              )}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page == Math.ceil(movieActions.length / 5)}
              className="cursor-pointer bg-[#1A1A1A] disabled:opacity-50 w-14 h-14 rounded-lg flex items-center justify-center"
            >
              <Image src={icons.next} alt="pre icon" />
            </button>
          </div>
        </div>

        <ul className="grid grid-cols-5 gap-7.5 transition-all duration-300">
          {pagination.map((group, index) => (
            <li key={index}>
              {group.isLoading ? (
                <div
                  key={index}
                  className="h-64 bg-zinc-900 animate-pulse rounded-xl"
                />
              ) : (
                <MovieTypeCard
                  isLoading={isAllLoading}
                  groupMovies={group.movies}
                  type={group.type}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
