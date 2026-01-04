"use client";

import Subtitle from "@/components/ui/Subtitle";
import Text from "@/components/ui/Text";
import { images } from "@/constants/images";
import Image from "next/image";

export default function Welcome() {
  return (
    <section>
      <div className="container">
        <div className="mb-37.5 mt-25 grid grid-cols-[1fr_2fr] gap-20">
          <div className="">
            <div className="mb-12.5">
              <div className="max-w-100 mb-5">
                <Subtitle text="Welcome to our support page!" />
              </div>
              <Text text="We're here to help you with any problems you may be having with our product." />
            </div>
            <div className="">
              <Image src={images.supportImage} alt="support page image" />
            </div>
          </div>
          <div className="bg-[#0F0F0F] border border-[#262626] p-12.5 rounded-lg">
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div className="grid grid-cols-2 gap-12.5 mb-12.5">
                <label className="">
                  <span className="block text-[18px] font-semibold mb-4 text-white">
                    First Name
                  </span>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="block bg-[#141414] h-17 p-[0_20px] border border-[#262626] outline-none text-[18px] text-[#999999] placeholder:text-[#999999] rounded-lg w-full "
                  />
                </label>
                <label className="">
                  <span className="block text-[18px] font-semibold mb-4 text-white">
                    Last Name
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="block bg-[#141414] h-17 p-[0_20px] border border-[#262626] outline-none text-[18px] text-[#999999] placeholder:text-[#999999] rounded-lg w-full "
                  />
                </label>
                <label className="">
                  <span className="block text-[18px] font-semibold mb-4 text-white">
                    Email
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className="block bg-[#141414] h-17 p-[0_20px] border border-[#262626] outline-none text-[18px] text-[#999999] placeholder:text-[#999999] rounded-lg w-full "
                  />
                </label>
                <label className="">
                  <span className="block text-[18px] font-semibold mb-4 text-white">
                    Phone Number
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="block bg-[#141414] h-17 p-[0_20px] border border-[#262626] outline-none text-[18px] text-[#999999] placeholder:text-[#999999] rounded-lg w-full "
                  />
                </label>
              </div>
              <div className="mb-12.5">
                <label className="">
                  <span className="block text-[18px] font-semibold mb-4 text-white">
                    Message
                  </span>
                  <textarea
                    placeholder="Enter your Message"
                    className="block bg-[#141414] resize-none h-40 p-5 border border-[#262626] outline-none text-[18px] text-[#999999] placeholder:text-[#999999] rounded-lg w-full "
                  ></textarea>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-6 h-6 border-2 border-[#262626] rounded-md bg-transparent checked:bg-[#E50000] checked:border-[#E50000] transition-all duration-200"
                    />
                    <svg
                      className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1 transition-all duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[18px] text-[#999999]">
                    I agree with Terms of Use and Privacy Policy
                  </span>
                </label>
                <button
                  className="p-[18px_24px] bg-[#E50000] rounded-lg text-white text-[18px] font-semibold"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
