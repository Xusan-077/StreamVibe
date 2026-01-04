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
    <li className="bg-[#1A1A1A] p-12.5 rounded-lg">
      <h3 className="text-[24px] font-bold text-white mb-4">{title}</h3>
      <p className="text-[18px] text-[#999999] mb-12.5">{description}</p>
      <div className="mb-12.5">
        <span className="">
          <span className="text-[40px] text-white font-semibold">
            $
            {isActive == "Monthly"
              ? priceForMonth
              : (priceForMonth * 11).toFixed(2)}
          </span>
          /{" "}
          <span className="text-[18px] text-[#999999] font-medium">
            {isActive ? "month" : "year"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-5">
        <button className="p-[18px_35px] cursor-pointer bg-[#141414] border border-[#262626] text-white w-full  rounded-lg">
          Start Free Trial
        </button>
        <button className="p-[18px_35px] cursor-pointer bg-[#E50000] text-white w-full  rounded-lg">
          Choose Plan
        </button>
      </div>
    </li>
  );
}
