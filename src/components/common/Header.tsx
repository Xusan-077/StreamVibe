"use client";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [burgerShown, setBurgerShown] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        setShowHeader(false);
        setBurgerShown(false);
      } else {
        setShowHeader(true);
      }

      setIsScrolled(currentScroll > 50);

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setBurgerShown(false);
  }, [pathname]);

  if (pathname === "/search") return null;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 py-5 
        ${showHeader ? "translate-y-0" : "-translate-y-full"} 
        ${
          isScrolled
            ? "backdrop-blur-md bg-[#0F0F0F]/80 border-b border-[#1F1F1F]"
            : "bg-transparent"
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={images.logo}
              alt="Logo"
              width={160}
              height={40}
              priority
              className="w-32 md:w-40 h-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center border-4 border-[#1F1F1F] rounded-xl p-2 bg-[#0F0F0F]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  pathname === link.path
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#E4E4E7] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/search"
              className="p-4 hover:opacity-70 transition-opacity"
            >
              <Image src={icons.search} alt="search" width={24} height={24} />
            </Link>
            <button className="p-4 hover:opacity-70 transition-opacity">
              <Image src={icons.call} alt="call" width={24} height={24} />
            </button>
          </div>

          <button
            onClick={() => setBurgerShown(!burgerShown)}
            className="lg:hidden bg-[#1A1A1A] border border-[#262626] rounded-lg w-12 h-12 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Image
              src={icons.burger}
              alt="menu"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {burgerShown && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 flex flex-col border-4 border-[#1F1F1F] rounded-xl p-2 bg-[#0F0F0F] shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-6 py-4 rounded-lg text-center transition-all ${
                  pathname === link.path
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#E4E4E7]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Movies & Shows", path: "/movies" },
  { label: "Support", path: "/support" },
  { label: "Subscriptions", path: "/subscriptions" },
];
