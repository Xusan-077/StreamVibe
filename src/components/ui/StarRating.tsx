import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  voteAverage: number;
}

export default function StarRating({ voteAverage }: Props) {
  const rating = voteAverage / 2;

  return (
    <div className="flex items-center gap-1 bg-[#141414] p-4 border border-[#262626] rounded-lg">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;

        return (
          <span key={index} className="text-[#E50000] text-lg">
            {rating >= starNumber ? (
              <FaStar />
            ) : rating >= starNumber - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar className="text-[#333333]" />
            )}
          </span>
        );
      })}
      <span className="ml-2 text-[#999999] font-medium">
        {voteAverage.toFixed(1)}
      </span>
    </div>
  );
}
