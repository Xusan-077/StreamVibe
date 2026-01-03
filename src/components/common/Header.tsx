"use client";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface INav {
  label: string;
  path: string;
}

export default function Header() {
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState<boolean>(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: INav[] = [
    { label: "Home", path: "/" },
    { label: "Movies & Shows", path: "/movies" },
    { label: "Support", path: "/support" },
    { label: "Subscriptions", path: "/subscriptions" },
  ];

  return (
    <header
      className={`${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } py-5 backdrop-blur-md fixed top-0 left-0 z-50 w-full transition-transform duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={images.logo}
              alt="StreamVibe Logo"
              width={160}
              height={40}
              className="w-auto h-auto"
            />
          </Link>

          <nav className="flex items-center border-4 border-[#1F1F1FFF] rounded-xl justify-between gap-2 p-2 bg-[#0F0F0FFF]">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[#1A1A1A] text-white"
                      : "text-[#E4E4E7] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center">
            <div className="p-4 cursor-pointer">
              <Image src={icons.search} alt="search icon" />
            </div>
            <div className="p-4 cursor-pointer">
              <Image src={icons.call} alt="call icon" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
