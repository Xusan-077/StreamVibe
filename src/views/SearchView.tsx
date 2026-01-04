"use client";

import MovieItem from "@/components/ui/MovieItem";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { API } from "@/services/API";
import { IApiResponse, IMovie } from "@/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchView() {
  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      const res = await API.get<IApiResponse<IMovie[]>>(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query.trim()
        )}&language=en-US`
      );

      return res.data;
    },
    onError: (error) => {
      console.error("Xatolik yuz berdi:", error);
    },
  });

  return (
    <section className="">
      <div className="bg-[#0F0F0F] h-screen flex flex-col duration-200">
        <div className="border-b border-[#262626]">
          <div className="mx-auto max-[640px]:w- px-6 py-6 flex items-center gap-6">
            <div className="max-[640px]:hidden">
              <Link href="/">
                <Image
                  src={images.logo}
                  alt="Logo"
                  width={160}
                  height={40}
                  priority
                  className="w-32 md:w-40 h-auto"
                />
              </Link>
            </div>

            <div className="flex-1 relative group flex items-center">
              <form
                className="w-full flex items-center gap-3 max-[600px]:flex-col"
                onSubmit={(e) => {
                  e.preventDefault();

                  if (query != "") {
                    mutate();
                  }
                }}
              >
                <div className="flex items-center gap-5 w-full bg-[#141414] border border-[#262626] rounded-xl py-4 pl-5 pr-6">
                  <div className="">
                    <Image
                      src={icons.search}
                      alt="search icon"
                      width={24}
                      height={24}
                      className="opacity-50 w-6 h-6 group-focus-within:opacity-100 transition-opacity"
                    />
                  </div>
                  <input
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    type="text"
                    placeholder="Search movies, shows, actors..."
                    className=" text-white text-xl outline-none focus:border-[#E50000] transition-all"
                  />
                </div>
                <div className="flex items-center gap-2 max-[600px]:w-full">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="relative max-[640px]:w-full flex items-center justify-center gap-2 bg-[#E50000] hover:bg-[#ff1a1a] disabled:bg-[#4d0000] disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-[#E50000]/20 overflow-hidden"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={icons.search}
                          alt="search"
                          width={20}
                          height={20}
                          className="brightness-0 invert"
                        />
                        <span>Search</span>
                      </>
                    )}

                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="flex max-[640px]:w-[70%] justify-center items-center gap-2 text-zinc-400 hover:text-white transition-all bg-[#1A1A1A] px-5 py-4 rounded-xl border border-[#262626]"
                  >
                    <span className="font-medium">Close</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="">
          <div className="max-w-[1440px] mx-auto px-6 py-10">
            <div className="mb-8">
              <h2 className="text-zinc-500 text-lg mb-8 flex items-center gap-2">
                Search Results
                <span className="w-2 h-2 rounded-full bg-[#E50000] shadow-[0_0_8px_#E50000]"></span>
              </h2>

              <div className="grid max-[1300px]:grid-cols-4  max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 grid-cols-5 gap-6">
                {isPending &&
                  Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="group">
                      <div className="relative aspect-[2/3] bg-[#1A1A1A] rounded-2xl border border-[#262626] mb-3 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#262626]/50 to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
                        <div className="w-full h-full bg-[#1A1A1A] animate-pulse" />
                      </div>

                      {/* Sarlavha skeletoni */}
                      <div className="h-5 bg-[#1A1A1A] rounded-lg w-3/4 mb-3 animate-pulse" />

                      {/* Janr/Yil skeletoni */}
                      <div className="h-4 bg-[#1A1A1A] rounded-lg w-1/2 animate-pulse" />
                    </div>
                  ))}

                {data?.results.map((movie) => (
                  <MovieItem movie={movie} />
                ))}
              </div>

              <div className="">
                {data?.results.length == 0 && (
                  <span className="text-red-500 block text-[18px] text-center font-semibold">
                    Movie not found
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
