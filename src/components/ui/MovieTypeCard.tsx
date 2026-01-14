import { icons } from "@/constants/icons";
import { IMovie } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  groupMovies: IMovie[];
  type: string;
  inTop?: boolean;
}

export default function MovieTypeCard({ groupMovies, type, inTop }: Props) {
  return (
    <ul className="">
      <li className="bg-[#1A1A1A] p-7.5 max-[1300px]:p-4 rounded-lg border border-[#262626]">
        <div className="grid grid-cols-2 gap-2">
          {groupMovies &&
            groupMovies?.map((movie: IMovie, index) => (
              <Link key={index} href={`/movie/${movie.id}`}>
                <Image
                  key={movie.id}
                  className="max-[640px]:w-full max-[640px]:h-17 w-full h-31 object-cover rounded-sm"
                  width={115}
                  height={125}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : `https://placehold.com/600x400/1a1a1a/ffffff.png?text=No+Image`
                  }
                  alt={movie.title}
                  style={{
                    maskImage:
                      index > 1
                        ? "linear-gradient(to bottom, black 0%, transparent 100%)"
                        : "none",
                    WebkitMaskImage:
                      index > 1
                        ? "linear-gradient(to bottom, black 0%, transparent 100%)"
                        : "none",
                  }}
                />
              </Link>
            ))}
        </div>
        {inTop && (
          <div className="bg-[#E50000] p-[3px_10px] inline-block rounded-sm">
            <span className="text-[16px] text-white font-semibold">
              Top 10 In
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h3 className="text-[18px] max-[640px]:text-[14px] font-semibold text-white">
            {type}
          </h3>
          <Image className="w-5 h-5" src={icons.arrow} alt="arrow icon" />
        </div>
      </li>
    </ul>
  );
}
