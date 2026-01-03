import HomeStart from "@/components/sections/home/HomeStart";
import MoviesHero from "@/components/sections/movies/MoviesHero";
import MoviesMovies from "@/components/sections/movies/MoviesMovies";

export default function MoviesView() {
  return (
    <>
      <MoviesHero />
      <MoviesMovies />
      <HomeStart />
    </>
  );
}
