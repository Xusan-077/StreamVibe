"use client";

import { icons } from "@/constants/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const noHeaderPaths = ["/search"];

  if (noHeaderPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-[#0F0F0F] py-25">
      <div className="container">
        <div className="grid grid-cols-6 justify-between max-[1024px]:grid-cols-3 max-[1024px]:gap-y-10 max-[640px]:grid-cols-2">
          <div className="">
            <h4 className="text-[20px] max-[640px]:text-[16px] font-semibold mb-4.5 text-white">
              Home
            </h4>
            <ul className="">
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Categories</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Devices</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Pricing</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-[20px] max-[640px]:text-[16px] font-semibold mb-4.5 text-white">
              Movies
            </h4>
            <ul className="">
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Gernes</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Trending</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">New Release</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Popular</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-[20px] max-[640px]:text-[16px] font-semibold mb-4.5 text-white">
              Shows
            </h4>
            <ul className="">
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Gernes</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Trending</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">New Release</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Popular</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-[20px] max-[640px]:text-[16px] font-semibold mb-4.5 text-white">
              Support
            </h4>
            <ul className="">
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-[20px] max-[640px]:text-[16px] font-semibold mb-4.5 text-white">
              Subscription
            </h4>
            <ul className="">
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Plans</Link>
              </li>
              <li className="text-[#999999] text-[18px] font-medium p-[6px_10px_6px_0] max-[640px]:text-[14px]">
                <Link href="/">Features</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-[20px] max-[640px]:text-[16px] font-semibold mb-4.5 text-white">
              Connect With Us
            </h4>
            <ul className="flex items-center gap-3.5">
              <li className="bg-[#1A1A1AFF] max-[640px]:w-11 max-[640px]:h-11 w-14 h-14 flex items-center justify-center rounded-lg cursor-pointer">
                <Image
                  src={icons.facebook}
                  alt="facebook icon"
                  className="max-[640px]:w-5 max-[640px]:h-5"
                />
              </li>
              <li className="bg-[#1A1A1AFF] max-[640px]:w-11 max-[640px]:h-11 w-14 h-14 flex items-center justify-center rounded-lg cursor-pointer">
                <Image
                  src={icons.twitter}
                  alt="twitter icon"
                  className="max-[640px]:w-5 max-[640px]:h-5"
                />
              </li>
              <li className="bg-[#1A1A1AFF] max-[640px]:w-11 max-[640px]:h-11 w-14 h-14 flex items-center justify-center rounded-lg cursor-pointer">
                <Image
                  src={icons.linkedin}
                  alt="linkedin icon"
                  className="max-[640px]:w-5 max-[640px]:h-5"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
