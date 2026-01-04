import { IMovie } from "@/types";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";

interface Props {
  movie: IMovie;
}

export default function MovieItem({ movie }: Props) {
  const { width } = useWindowSize();

  return (
    <li className="group bg-[#1A1A1A] p-5 max-[640px]:p-4 rounded-xl border border-[#262626] transition-all hover:border-[#E50000]/50">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-lg mb-5">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            width={300}
            height={450}
            className={`h-100 w-full max-[640px]:h-65 max-[425px]:h-50 object-cover group-hover:scale-105 transition-transform duration-500`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
            <Link
              href={`/movie/${movie.id}`}
              className="w-full bg-[#E50000] py-2.5 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-[#ff1a1a]"
            >
              <span className="text-white font-bold block text-center text-sm">
                Watch Now
              </span>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-white text-[16px] font-semibold line-clamp-1 group-hover:text-[#E50000] transition-colors">
            {movie.title}
          </h4>
          {width > 640 ? (
            <div className="flex items-center justify-between">
              <StarRating voteAverage={movie.vote_average} />
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
    </li>
  );
}
