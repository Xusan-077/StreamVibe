import HomeStart from "@/components/sections/home/HomeStart";
import SupportQuestions from "@/components/sections/support/SupportQuestions";
import Welcome from "@/components/sections/support/SupportWelcome";

export default function SupportView() {
  return (
    <>
      <Welcome />
      <SupportQuestions />
      <HomeStart />
    </>
  );
}
