import HomeExplore from "@/components/sections/home/HomeExplore";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeProvide from "@/components/sections/home/HomeProvide";
import HomeStart from "@/components/sections/home/HomeStart";
import SubscriptionsPlan from "@/components/sections/subscriptions/SubscriptionsPlan";
import SupportQuestions from "@/components/sections/support/SupportQuestions";

export default function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeExplore />
      <HomeProvide />
      <SupportQuestions />
      <SubscriptionsPlan />
      <HomeStart />
    </>
  );
}
