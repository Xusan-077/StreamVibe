"use client";

import Subtitle from "@/components/ui/Subtitle";
import Text from "@/components/ui/Text";
import { icons } from "@/constants/icons";
import Image from "next/image";
import { useState } from "react";

interface IFaqs {
  id: string;
  question: string;
  answer: string;
}

export default function SupportQuestions() {
  const [openId, setOpenId] = useState<string | null>("01");

  const faqData: IFaqs[] = [
    {
      id: "01",
      question: "What is StreamVibe?",
      answer:
        "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: "02",
      question: "How much does StreamVibe cost?",
      answer:
        "StreamVibe offers different pricing plans to fit your needs. You can choose from our monthly or yearly subscriptions.",
    },
    {
      id: "03",
      question: "What content is available on StreamVibe?",
      answer:
        "StreamVibe provides a vast library of movies, TV shows, documentaries, and exclusive original content across various genres.",
    },
    {
      id: "04",
      question: "How can I watch StreamVibe?",
      answer:
        "You can watch StreamVibe on any internet-connected device, including smart TVs, smartphones, tablets, and web browsers.",
    },
    {
      id: "05",
      question: "How do I sign up for StreamVibe?",
      answer:
        "To sign up, simply click on the 'Start Free Trial' button, choose your plan, and enter your account details.",
    },
    {
      id: "06",
      question: "What is the StreamVibe free trial?",
      answer:
        "Our free trial allows you to explore the full library of StreamVibe for a limited time at no cost before your subscription begins.",
    },
    {
      id: "07",
      question: "How do I contact StreamVibe customer support?",
      answer:
        "You can reach our support team through the 'Contact Us' page, live chat, or by sending an email to our help desk.",
    },
    {
      id: "08",
      question: "What are the StreamVibe payment methods?",
      answer:
        "We accept all major credit cards, PayPal, and various digital payment methods depending on your region.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="mb-37.5">
          <div className="mb-20">
            <Subtitle text="Frequently Asked Questions" />
            <Text text="Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe." />
          </div>
          <div className="grid grid-cols-2 gap-x-20 gap-y-5 ">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-[#E50000] pb-5 pt-5 transition-all duration-300"
              >
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-[#1A1A1A] border border-[#262626] p-4 rounded-lg text-white font-bold text-lg">
                      {faq.id}
                    </div>
                    <h3 className="text-white text-xl font-medium group-hover:text-zinc-300 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="text-white">
                    {openId === faq.id ? (
                      <Image src={icons.minus} alt="minus icon" />
                    ) : (
                      <Image src={icons.plus} alt="plus icon" />
                    )}
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openId === faq.id
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-zinc-400 pl-[76px] text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
