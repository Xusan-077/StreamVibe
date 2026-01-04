import Link from "next/link";

export default function HomeStart() {
  return (
    <section className="mb-20 md:mb-37.5">
      <div className="container">
        <div className="relative overflow-hidden rounded-lg p-10 md:p-[100px_80px] flex flex-col md:flex-row items-center justify-between gap-10 -translate-y-[30px] z-10">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
            style={{ backgroundImage: `url('/images/start-bg.png')` }}
          />

          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-[48px] font-bold text-white leading-tight mb-4">
              Start your free trial today!
            </h3>
            <p className="text-base md:text-[18px] text-[#999999] max-w-[1000px]">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Link
              className="p-[18px_24px] bg-[#E50000] text-[18px] font-semibold text-white rounded-lg block text-center min-w-[200px] hover:bg-[#ff1a1a] transition-colors"
              href="/movies"
            >
              Start a Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
