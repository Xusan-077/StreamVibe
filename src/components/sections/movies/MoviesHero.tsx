"use client";

import { icons } from "@/constants/icons";
import { API } from "@/services/API";
import {
  IApiResponse,
  IMovie,
  IMovieVideo,
  IMovieVideoResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MoviesHero() {
  const [page, setPage] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["poular movies"],
    queryFn: async () => {
      const res = await API.get<IApiResponse<IMovie[]>>("/movie/popular");

      return res?.data;
    },
  });

  const movies = data?.results.slice(0, 5);

  const start = page;
  const end = start + 1;
  const movie = movies?.slice(start, end);

  const { data: movieVideos } = useQuery<IMovieVideoResponse<IMovieVideo[]>>({
    queryKey: ["video", movie && movie[0].id],
    queryFn: async () => {
      const res = await API.get(`/movie/${movie && movie[0].id}/videos`);

      return res?.data;
    },
    enabled: !!movie && !!movie[0]?.id,
  });
  const getMainVideo = (videos: { results: IMovieVideo[] } | undefined) => {
    if (!videos || !videos.results || videos.results.length === 0) {
      return null;
    }
    const youtubeVideos = videos.results.filter((v) => v.site === "YouTube");
    const officialTrailer = youtubeVideos.find(
      (v) => v.type === "Trailer" && v.official
    );
    const anyTrailer = youtubeVideos.find((v) => v.type === "Trailer");
    return officialTrailer || anyTrailer || youtubeVideos[0] || null;
  };
  const videoToPlay = getMainVideo(movieVideos);
  const handlePlayClick = () => {
    if (videoToPlay?.key) {
      window.open(
        `https://www.youtube.com/watch?v=${videoToPlay.key}`,
        "_blank"
      );
    } else {
      alert("Video topilmadi!");
    }
  };

  return (
    <section
      className="relative mb-45 w-full min-h-215 flex items-end pb-20 overflow-hidden bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(15,15,15,0.8) 50%, rgba(15,15,15,1) 100%), url(https://image.tmdb.org/t/p/original${
          movie && movie[0]?.backdrop_path
        })`,
      }}
    >
      <div className="container">
        <div className="relative z-10 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">
            {movie && movie[0]?.title}
          </h1>
          <p className="text-[#999999] max-w-300 mx-auto mb-10">
            {movie && movie[0]?.overview}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePlayClick}
              className="bg-[#E50000] cursor-pointer px-8 py-4 flex items-center rounded-lg gap-2"
            >
              <Image src={icons.start} alt="start icon" />
              <span className="text-white font-semibold">Play Now</span>
            </button>
          </div>
          <div className="">
            <div className="flex items-center justify-between mt-12.5">
              <button
                disabled={page == 0}
                className="bg-[#0F0F0F] rounded-lg disabled:opacity-50 w-14 h-14 flex items-center justify-center cursor-pointer"
                onClick={() => setPage((p) => p - 1)}
              >
                <Image src={icons.pre} alt="pre icon" />
              </button>
              <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                  {movies?.slice(0, 5).map((_, index) => {
                    const isActive = page === index;

                    return (
                      <div
                        key={index}
                        className={`h-1 transition-all duration-300 rounded-full ${
                          isActive ? "w-6 bg-[#E50000]" : "w-4 bg-[#333333]"
                        }`}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={movies && page == movies?.length - 1}
                className="bg-[#0F0F0F] disabled:opacity-50 rounded-lg w-14 h-14 flex items-center justify-center cursor-pointer"
              >
                <Image src={icons.next} alt="next icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
