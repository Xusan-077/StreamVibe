"use client";

import { icons } from "@/constants/icons";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="home-hero mb-50 max-[620px]:-translate-y-10 max-[620px]:mb-25">
      <div className="container">
        <div className="flex flex-col items-center relative mx-auto text-center">
          <h1 className="max-[620px]:text-[28px] text-[58px] mb-4 font-bold text-white">
            The Best Streaming Experience
          </h1>
          <p className="max-[620px]:text-[14px] text-[#999999] max-w-275 text-[18px] mb-10">
            StreamVibe is the best streaming experience for watching your
            favorite movies and shows on demand, anytime, anywhere. With
            StreamVibe, you can enjoy a wide variety of content, including the
            latest blockbusters, classic movies, popular TV shows, and more. You
            can also create your own watchlists, so you can easily find the
            content you want to watch.
          </p>

          <Link
            href={"/movies"}
            className="bg-[#E50000] transition-all duration-300 hover:bg-red-700 text-white p-[20px_25px] rounded-xl font-semibold flex items-center gap-2"
          >
            <Image src={icons.start} alt="start icon" />
            Start Watching Now
          </Link>
        </div>
      </div>
    </section>
  );
}
