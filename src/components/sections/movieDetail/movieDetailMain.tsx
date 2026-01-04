"use client";

import { API } from "@/services/API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  IMovieCredits,
  IMovieDetails,
  IMovieReviews,
  IMovieVideo,
  IMovieVideoResponse,
  IReview,
} from "@/types";
import Image from "next/image";
import { icons } from "@/constants/icons";
import StarRating from "@/components/ui/StarRating";
import { useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function MovieDetailMain() {
  const { width } = useWindowSize();

  const [creditsPage, setCreditsPage] = useState<number>(1);
  const [reviewsPage, setReviewsPage] = useState<number>(1);
  const ITEMS_PER_PAGE = width >= 1200 ? 8 : width >= 768 ? 6 : 6;

  const { movieId } = useParams();

  const { data: movie } = useQuery({
    queryFn: async () => {
      const res = await API.get<IMovieDetails>(`/movie/${movieId}`);

      return res.data;
    },
    queryKey: ["movie", movieId],
  });

  const { data: credits } = useQuery({
    queryKey: ["movie-credits", movieId],
    queryFn: async () => {
      const res = await API.get<IMovieCredits>(`/movie/${movieId}/credits`);
      return res.data;
    },
  });
  const startIndex = (creditsPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const creditsPagonation = credits?.cast.slice(startIndex, endIndex);

  const { data: reviews } = useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: async () => {
      const res = await API.get<IMovieReviews<IReview[]>>(
        `/movie/${movieId}/reviews`
      );
      return res.data.results;
    },
  });
  const reviewsTotalPages = width < 850 ? 1 : 2;
  const reviewsStartIndex = (reviewsPage - 1) * reviewsTotalPages;
  const reviewsEndIndex = reviewsStartIndex + reviewsTotalPages;
  const reviewsPagonation = reviews?.slice(reviewsStartIndex, reviewsEndIndex);

  // video
  const { data: movieVideos } = useQuery<IMovieVideoResponse<IMovieVideo[]>>({
    queryKey: ["video", movieId],
    queryFn: async () => {
      const res = await API.get(`/movie/${movieId}/videos`);

      return res?.data;
    },
    enabled: !!movieId,
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
    <section>
      <div className="container">
        <div className="mb-37.5">
          <div
            className="relative mb-25 max-[640px]:mb-20 w-full min-h-210 rounded-t-lg flex items-end pb-20 overflow-hidden bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(15,15,15,0.8) 50%, rgba(15,15,15,1) 100%), url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            }}
          >
            <div className="mx-auto">
              <div className="text-center">
                <h1 className="text-white max-[640px]:text-[24px] text-5xl font-bold mb-4">
                  {movie?.title}
                </h1>
                <p
                  className={`${
                    width < 640 ? "hidden" : ""
                  } text-[#999999] max-w-300 mx-auto mb-10`}
                >
                  {movie?.overview}
                </p>
              </div>
              <div className="">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handlePlayClick}
                    className="bg-[#E50000] px-8 py-4 flex cursor-pointer items-center rounded-lg gap-2"
                  >
                    <Image src={icons.start} alt="start icon" />
                    <span className="text-white font-semibold">Play Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[3fr_1fr] max-[1200px]:flex max-[1200px]:flex-col-reverse gap-5 items-start">
            <div className="w-full">
              <div className="bg-[#1A1A1A] p-12.5 max-[768px]:p-6 rounded-lg mb-7.5">
                <h4 className="text-[18px] mb-2.5 font-medium text-[#999999]">
                  Description
                </h4>
                <p className="text-[18px] font-medium text-white max-[640px]:text-[14px]">
                  {movie?.overview}
                </p>
              </div>
              <div className="bg-[#1A1A1A] p-12.5 max-[768px]:p-6 rounded-lg mb-7.5">
                <div className="flex items-center justify-between mb-7.5 flex-wrap">
                  <h4 className="text-[18px] max-[450px]:mb-5 mb-2.5 font-medium text-[#999999]">
                    Cast
                  </h4>
                  <div className="flex items-center gap-2.5">
                    <div className="">
                      <button
                        onClick={() =>
                          creditsPage == 1
                            ? setCreditsPage(
                                Math.ceil(
                                  (credits?.cast?.length || 0) / ITEMS_PER_PAGE
                                )
                              )
                            : setCreditsPage((p) => p - 1)
                        }
                        className="bg-[#141414] disabled:opacity-50 rounded-full border border-[#262626] flex items-center justify-center w-13 h-13"
                      >
                        <Image src={icons.pre} alt="pre icon" className="" />
                      </button>
                    </div>
                    <div className="max-[640px]:hidden flex items-center gap-1">
                      {Array.from({
                        length: Math.ceil(
                          Number(credits?.cast.length) / ITEMS_PER_PAGE
                        ),
                      }).map((_, index) => {
                        const isActive = creditsPage === index + 1;

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
                    <div className="">
                      <button
                        onClick={() =>
                          creditsPage >=
                          Math.ceil(
                            (credits?.cast?.length || 0) / ITEMS_PER_PAGE
                          )
                            ? setCreditsPage(1)
                            : setCreditsPage((p) => p + 1)
                        }
                        className="bg-[#141414] rounded-full disabled:opacity-50 border border-[#262626] flex items-center justify-center w-13 h-13"
                      >
                        <Image src={icons.next} alt="pre icon" className="" />
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="flex items-center justify-between flex-wrap">
                  {creditsPagonation?.map((el) => (
                    <li key={el.id} className="">
                      <Image
                        width={104}
                        height={112}
                        className="max-[640px]:w-18 max-[640px]:h-18 w-26 h-28 rounded-2xl"
                        src={
                          el?.profile_path
                            ? `https://image.tmdb.org/t/p/w200${el.profile_path}`
                            : "/images/no-avatar.png"
                        }
                        alt={el.name}
                      />
                    </li>
                  ))}
                  <li className=""></li>
                </ul>
              </div>
              <div className="bg-[#1A1A1A] p-12.5 max-[768px]:p-6 rounded-lg">
                <div className="mb-10">
                  <h4 className="text-[18px] mb-2.5 font-medium text-[#999999]">
                    Reviews
                  </h4>
                </div>
                <div className="">
                  {!reviews?.length && (
                    <div className="text-[#999999] text-[20px] text-center">
                      No Reviews Yet
                    </div>
                  )}
                  <ul
                    className={`${
                      width < 850 ? "grid-cols-1" : "grid-cols-2"
                    } grid  gap-5`}
                  >
                    {reviewsPagonation?.map((el) => (
                      <li
                        key={el.id}
                        className="bg-[#0F0F0F] p-10 border border-[#262626] rounded-lg"
                      >
                        <div className="">
                          <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
                            <h3 className="text-[20px] font-medium text-white">
                              {el.author}
                            </h3>
                            <StarRating
                              voteAverage={Number(el?.author_details?.rating)}
                            />
                          </div>
                          <div className="">
                            <p className="text-[18px] text-[#999999] line-clamp-4">
                              {el.content}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center mt-10">
                    <div className="flex items-center gap-2.5">
                      <div className="">
                        <button
                          onClick={() =>
                            reviewsPage == 1
                              ? setReviewsPage(
                                  Math.ceil(
                                    Number(reviews?.length) / reviewsTotalPages
                                  )
                                )
                              : setReviewsPage((p) => p - 1)
                          }
                          className="bg-[#141414] disabled:opacity-50 rounded-full border border-[#262626] flex items-center justify-center w-13 h-13"
                        >
                          <Image src={icons.pre} alt="pre icon" className="" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({
                          length: Math.ceil(
                            Number(reviews?.length) / reviewsTotalPages
                          ),
                        }).map((_, index) => {
                          const isActive = reviewsPage === index + 1;

                          return (
                            <div
                              key={index}
                              className={`h-1 transition-all duration-300 rounded-full ${
                                isActive
                                  ? "w-6 bg-[#E50000]"
                                  : "w-4 bg-[#333333]"
                              }`}
                            ></div>
                          );
                        })}
                      </div>
                      <div className="">
                        <button
                          onClick={() =>
                            reviewsPage >=
                            Math.ceil(
                              (reviews?.length || 0) / reviewsTotalPages
                            )
                              ? setReviewsPage(1)
                              : setReviewsPage((p) => p + 1)
                          }
                          className="bg-[#141414] rounded-full disabled:opacity-50 border border-[#262626] flex items-center justify-center w-13 h-13"
                        >
                          <Image src={icons.next} alt="pre icon" className="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1A1A] p-12.5 rounded-lg w-full max-[768px]:p-6">
              <div className="mb-7.5">
                <div className="flex items-center gap-1 mb-2.5">
                  <Image src={icons.released} alt="released icom" />
                  <span className="text-[18px] text-[#999999] font-medium">
                    Released Year
                  </span>
                </div>
                <h4 className="text-[20px] font-semibold text-white">
                  {movie?.release_date.split("-")[0]}
                </h4>
              </div>
              <div className="mb-7.5">
                <div className="flex items-center gap-1 mb-2.5">
                  <Image src={icons.languages} alt="released icom" />
                  <span className="text-[18px] text-[#999999] font-medium">
                    Available Languages
                  </span>
                </div>
                <ul className="flex items-center flex-wrap text-[20px] font-semibold text-white">
                  {movie?.spoken_languages.map((el) => (
                    <li
                      key={el.iso_639_1}
                      className="bg-[#141414] p-[8px_14px] text-[18px] font-medium text-white border border-[#262626] rounded-lg"
                    >
                      {el.english_name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-7.5">
                <div className="flex items-center gap-1 mb-5">
                  <Image src={icons.ratings} alt="released icom" />
                  <span className="text-[18px] text-[#999999] font-medium">
                    Ratings
                  </span>
                </div>
                <StarRating voteAverage={Number(movie?.vote_average)} />
              </div>
              <div className="mb-7.5">
                <div className="flex items-center gap-1 mb-2.5">
                  <Image src={icons.gernes} alt="released icom" />
                  <span className="text-[18px] text-[#999999] font-medium">
                    Gernes
                  </span>
                </div>
                <ul className="flex items-center flex-wrap text-[20px] font-semibold text-white">
                  {movie?.genres.map((el) => (
                    <li
                      key={el.id}
                      className="bg-[#141414] p-[8px_14px] text-[18px] font-medium text-white border border-[#262626] rounded-lg"
                    >
                      {el.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
