"use client";

import CarouselControler from "@/components/ui/CarouselControler";
import MovieItem from "@/components/ui/MovieItem";
import Subtitle from "@/components/ui/Subtitle";
import { icons } from "@/constants/icons";
import { useWindowSize } from "@/hooks/useWindowSize";
import { API } from "@/services/API";
import { IApiResponse, IMovie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface Props {
  url: string;
  title: string;
  key: string;
}

export default function MoviesTrending({ url, title, key }: Props) {
  const { width } = useWindowSize();

  const [page, setPage] = useState<number>(1);
  const totalPage = width >= 1200 ? 4 : width >= 768 ? 3 : 2;

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
  const maxPages = Math.ceil(Number(data?.results?.length) / totalPage);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-12.5">
        <Subtitle text={title} />
        <div className="max-[768px]:hidden bg-[#0F0F0F] flex items-center gap-4 p-4 rounded-lg">
          <CarouselControler
            maxPages={maxPages}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="">
        <ul
          className={`${
            width > 1200 ? "grid-cols-4" : "grid-cols-3"
          }  max-[900px]:grid-cols-2 grid gap-5`}
        >
          {pagination?.map((el) => (
            <MovieItem key={el.id} movie={el} />
          ))}
        </ul>
        <div className="hidden max-[768px]:flex max-[768px]:mt-5 bg-[#0F0F0F] justify-between items-center gap-4 p-4 rounded-lg">
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
