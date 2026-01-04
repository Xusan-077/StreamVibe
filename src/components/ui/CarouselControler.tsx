import { icons } from "@/constants/icons";
import Image from "next/image";

interface Props {
  page: number;
  maxPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CarouselControler({ page, setPage, maxPages }: Props) {
  if (maxPages <= 1) return null;

  return (
    <>
      <button
        onClick={() => setPage((p) => (p === 1 ? maxPages : p - 1))}
        className="max-[640px]:w-10 max-[640px]:h-10 cursor-pointer bg-[#1A1A1A] hover:bg-[#262626] active:scale-95 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200"
      >
        <Image
          src={icons.pre}
          alt="previous"
          width={24}
          height={24}
          className="max-[640px]:w-5 max-[640px]:h-5"
        />
      </button>

      <div className="flex items-center max-[640px]:gap-0 gap-1">
        {Array.from({ length: maxPages }).map((_, index) => {
          const isActive = page === index + 1;
          return (
            <div
              key={index}
              className={`h-1 transition-all duration-300
          ${
            isActive
              ? "max-[350px]:w-5 w-6 bg-[#E50000]"
              : "max-[350px]:w-3 w-4 bg-[#333333]"
          } 
          rounded-full 
          ${
            index === 0
              ? "max-[640px]:rounded-l-full max-[640px]:rounded-r-none"
              : index === maxPages - 1
              ? "max-[640px]:rounded-r-full max-[640px]:rounded-l-none"
              : "max-[640px]:rounded-none"
          }
        `}
            />
          );
        })}
      </div>

      <button
        onClick={() => setPage((p) => (p === maxPages ? 1 : p + 1))}
        className="max-[640px]:w-10 max-[640px]:h-10 cursor-pointer bg-[#1A1A1A] hover:bg-[#262626] active:scale-95 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-200"
      >
        <Image
          src={icons.next}
          alt="next"
          width={24}
          height={24}
          className="max-[640px]:w-5 max-[640px]:h-5"
        />
      </button>
    </>
  );
}
