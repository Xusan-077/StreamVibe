import HomeExplore from "@/components/sections/home/HomeExplore";
import HomeHero from "@/components/sections/home/HomeHero";
import HomeProvide from "@/components/sections/home/HomeProvide";
import HomeStart from "@/components/sections/home/HomeStart";

export default function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeExplore />
      <HomeProvide />
      <HomeStart />
    </>
  );
}
