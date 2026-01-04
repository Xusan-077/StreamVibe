"use client";
import Subtitle from "@/components/ui/Subtitle";
import Text from "@/components/ui/Text";
import { useState } from "react";

const plans = [
  {
    id: "Basic",
    price: "$9.99/Month",
    content:
      "Access to a wide selection of movies and shows, including some new releases.",
    devices: "Watch on one device simultaneously",
    trial: "7 Days",
    cancel: "Yes",
    hdr: "No",
    dolby: "No",
    adFree: "No",
    offline: "No",
    family: "No",
  },
  {
    id: "Standard",
    price: "$12.99/Month",
    content:
      "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
    devices: "Watch on two devices simultaneously",
    trial: "7 Days",
    cancel: "Yes",
    hdr: "Yes",
    dolby: "Yes",
    adFree: "Yes",
    offline: "Yes, for select titles.",
    family: "Yes, up to 5 family members.",
  },
  {
    id: "Premium",
    price: "$14.99/Month",
    content:
      "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
    devices: "Watch on four devices simultaneously",
    trial: "7 Days",
    cancel: "Yes",
    hdr: "Yes",
    dolby: "Yes",
    adFree: "Yes",
    offline: "Yes, for all titles.",
    family: "Yes, up to 6 family members.",
  },
];

export default function SubscriptionsCompare() {
  const [activePlan, setActivePlan] = useState("Basic");

  const currentPlan = plans.find((p) => p.id === activePlan) || plans[0];

  return (
    <section className="">
      <div className="container">
        <div className="mb-37.5 max-[640px]:mb-20">
          <div className="mb-20 max-[640px]:mb-10">
            <Subtitle text="Compare our plans and find the right one for you" />
            <Text text="StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium." />
          </div>

          <div className="hidden md:block w-full overflow-x-auto border border-[#262626] rounded-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#141414]">
                  <th className="p-6 text-white font-semibold border-b border-r border-[#262626]">
                    Features
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className="p-6 text-white font-semibold border-b border-r border-[#262626] last:border-r-0"
                    >
                      {p.id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[#999999]">
                {[
                  { label: "Price", key: "price" },
                  { label: "Content", key: "content" },
                  { label: "Devices", key: "devices" },
                  { label: "Free Trial", key: "trial" },
                  { label: "Cancel Anytime", key: "cancel" },
                  { label: "HDR", key: "hdr" },
                  { label: "Dolby Atmos", key: "dolby" },
                  { label: "Ad Free", key: "adFree" },
                  { label: "Offline Viewing", key: "offline" },
                  { label: "Family Sharing", key: "family" },
                ].map((row) => (
                  <tr
                    key={row.key}
                    className="hover:bg-[#1A1A1A] transition-colors"
                  >
                    <td className="p-5 border-b border-r border-[#262626] font-medium">
                      {row.label}
                    </td>
                    {plans.map((p) => (
                      <td
                        key={p.id}
                        className="p-5 border-b border-r border-[#262626] last:border-r-0"
                      >
                        {p[row.key as keyof typeof p]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-6">
            <div className="bg-[#141414] p-2 rounded-xl border border-[#262626] flex justify-between">
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlan(p.id)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    activePlan === p.id
                      ? "bg-[#1F1F1F] text-white shadow-lg"
                      : "text-[#999999]"
                  }`}
                >
                  {p.id}
                </button>
              ))}
            </div>

            <div className="bg-[#141414] border border-[#262626] p-6 rounded-2xl grid grid-cols-2 gap-y-8 gap-x-4">
              <InfoBox label="Price" value={currentPlan.price} />
              <InfoBox label="Free Trial" value={currentPlan.trial} />
              <InfoBox label="Content" value={currentPlan.content} full />
              <InfoBox label="Devices" value={currentPlan.devices} full />
              <InfoBox label="Cancel Anytime" value={currentPlan.cancel} />
              <InfoBox label="HDR" value={currentPlan.hdr} />
              <InfoBox label="Dolby Atmos" value={currentPlan.dolby} />
              <InfoBox label="Ad Free" value={currentPlan.adFree} />
              <InfoBox label="Offline Viewing" value={currentPlan.offline} />
              <InfoBox label="Family Sharing" value={currentPlan.family} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBox({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
      <p className="text-[#999999] text-sm">{label}</p>
      <p className="text-white text-base font-medium leading-relaxed">
        {value}
      </p>
    </div>
  );
}
