"use client";

import MovieItem from "@/components/ui/MovieItem";
import Subtitle from "@/components/ui/Subtitle";
import { icons } from "@/constants/icons";
import { API } from "@/services/API";
import { IApiResponse, IMovie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface Props {
  url: string;
  title: string;
  key: string;
  must?: boolean;
}

export default function MoviesTrending({ url, title, must, key }: Props) {
  const [page, setPage] = useState<number>(1);
  const totalPage = must ? 4 : 5;

  const { data } = useQuery({
    queryKey: [`${key}`],
    queryFn: async () => {
      const res = await API.get<IApiResponse<IMovie[]>>(url);

      return res?.data;
    },
  });

  const start = (page - 1) * totalPage;
  const end = start + totalPage;

  const pagination = data?.results.slice(start, end);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-12.5">
        <Subtitle text={title} />

        <div className="bg-[#0F0F0F] flex items-center gap-4 p-4 rounded-lg">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page == 1}
            className="cursor-pointer bg-[#1A1A1A] disabled:opacity-50 w-14 h-14 rounded-lg flex items-center justify-center"
          >
            <Image src={icons.pre} alt="pre icon" />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({
              length: Math.ceil(Number(data?.results?.length) / totalPage || 0),
            }).map((_, index) => {
              const isActive = page === index + 1;

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
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={
              page == Math.ceil(Number(data?.results?.length) / totalPage || 0)
            }
            className="cursor-pointer bg-[#1A1A1A] disabled:opacity-50 w-14 h-14 rounded-lg flex items-center justify-center"
          >
            <Image src={icons.next} alt="pre icon" />
          </button>
        </div>
      </div>
      <div className="">
        <ul className={`${must ? "grid-cols-4" : "grid-cols-5"} grid gap-5`}>
          {pagination?.map((el) => (
            <MovieItem inMust key={el.id} movie={el} />
          ))}
        </ul>
      </div>
    </div>
  );
}
