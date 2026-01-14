"use client";

import CarouselControler from "@/components/ui/CarouselControler";
import MovieItem from "@/components/ui/MovieItem";
import Subtitle from "@/components/ui/Subtitle";
import { API } from "@/services/API";
import { IApiResponse, IMovie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";

interface Props {
  url: string;
  title: string;
  queryKey: string;
}

export default function MoviesTrending({ url, title, queryKey }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 5,
    breakpoints: {
      "(max-width: 1280px)": { slidesToScroll: 4 },
      "(max-width: 1024px)": { slidesToScroll: 3 },
      "(max-width: 768px)": { slidesToScroll: 2 },
      "(max-width: 480px)": { slidesToScroll: 1 },
    },
  });

  const { data: trendMovies } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await API.get<IApiResponse<IMovie[]>>(url);
      return res?.data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-12.5">
        <Subtitle text={title} />
        <div className="hidden md:flex bg-[#0F0F0F] items-center gap-4 p-4 rounded-lg border border-[#262626]">
          <CarouselControler emblaApi={emblaApi} />
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-5 touch-pan-y">
          {trendMovies?.results?.map((el) => (
            <li
              key={el.id}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-20px)] md:flex-[0_0_calc(33.33%-20px)] lg:flex-[0_0_calc(25%-20px)] xl:flex-[0_0_calc(20%-20px)]"
            >
              <MovieItem movie={el} />
            </li>
          ))}
        </ul>
      </div>

      <div className="md:hidden flex justify-end mt-5">
        <div className="bg-[#0F0F0F] flex items-center gap-4 p-4 rounded-lg border border-[#262626]">
          <CarouselControler emblaApi={emblaApi} />
        </div>
      </div>
    </div>
  );
}
