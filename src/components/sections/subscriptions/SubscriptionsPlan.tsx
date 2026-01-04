"use client";

import Subtitle from "@/components/ui/Subtitle";
import Text from "@/components/ui/Text";
import { useState } from "react";
import PlanCard from "./PlanCard";

interface IPlan {
  id: number;
  title: string;
  description: string;
  priceForMonth: number;
}

export default function SubscriptionsPlan() {
  const [isActive, setIsActive] = useState<string>("Monthly");

  const palns: IPlan[] = [
    {
      id: 1,
      title: "Basic Plan",
      description:
        "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      priceForMonth: 9.99,
    },
    {
      id: 2,
      title: "Standard Plan",
      description:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      priceForMonth: 12.99,
    },
    {
      id: 3,
      title: "Premium Plan",
      description:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      priceForMonth: 14.99,
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="mb-37.5 mt-25">
          <div className="flex justify-between mb-20">
            <div className="">
              <Subtitle text="Choose the plan that's right for you" />
              <Text text="Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!" />
            </div>
            <div className="bg-[#0F0F0F] rounded-lg p-2 flex items-center">
              <div
                onClick={() => setIsActive("Monthly")}
                className={`${
                  isActive == "Monthly" ? "bg-[#1F1F1F] rounded-lg" : ""
                } transition-all duration-300 p-[14_24px] text-white rounded-lg cursor-pointer`}
              >
                <span className="">Monthly</span>
              </div>
              <div
                onClick={() => setIsActive("Yearly")}
                className={`${
                  isActive == "Yearly" ? "bg-[#1F1F1F] rounded-lg" : ""
                } transition-all duration-300 p-[14_24px] text-white rounded-lg cursor-pointer`}
              >
                <span className="">Yearly</span>
              </div>
            </div>
          </div>
          <ol className="grid grid-cols-3 gap-7.5">
            {palns.map((el) => (
              <PlanCard {...el} key={el.id} isActive={isActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
