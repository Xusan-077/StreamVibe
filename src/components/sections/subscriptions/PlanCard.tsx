interface Props {
  title: string;
  description: string;
  priceForMonth: number;
  isActive: string;
}

export default function PlanCard({
  title,
  description,
  priceForMonth,
  isActive,
}: Props) {
  return (
    <li className="bg-[#1A1A1A] p-12.5 rounded-lg max-[640px]:p-6">
      <h3 className="text-[24px] font-bold text-white mb-4 max-[640px]:text-[18px]">
        {title}
      </h3>
      <p className="text-[18px] text-[#999999] mb-12.5 h-20 max-[640px]:h-auto max-[640px]:mb-7.5 max-[640px]:text-[14px]">
        {description}
      </p>
      <div className="mb-12.5 max-[640px]:mb-7.5">
        <span className="">
          <span className="text-[40px] max-[640px]:text-[24px] text-white font-semibold">
            $
            {isActive == "Monthly"
              ? priceForMonth
              : (priceForMonth * 11).toFixed(2)}
          </span>
          /{" "}
          <span className="max-[640px]:text-[14px] text-[18px] text-[#999999] font-medium">
            {isActive ? "month" : "year"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-5">
        <button className="p-4 w-full cursor-pointer bg-[#141414] border border-[#262626] text-white rounded-lg">
          Start Free
        </button>
        <button className="p-4 w-full cursor-pointer bg-[#E50000] text-white rounded-lg">
          Choose
        </button>
      </div>
    </li>
  );
}
