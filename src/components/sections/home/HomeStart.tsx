import Link from "next/link";

export default function HomeStart() {
  return (
    <section className="mb-37.5">
      <div className="container">
        <div className="p-[100px_80px] start rounded-lg justify-between">
          <div className="">
            <h3 className="text-[48px] font-bold text-white">
              Start your free trial today!
            </h3>
            <p className="text-[18px] text-[#999999] max-w-308">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>
          <div className="">
            <Link
              className="p-[18px_24px] bg-[#E50000] text-[18px] font-semibold text-white rounded-lg "
              href="/movies"
            >
              Start a Free Trail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
