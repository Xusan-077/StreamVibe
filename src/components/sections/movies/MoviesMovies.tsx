import MovieGenres from "@/components/ui/MovieGenres";
import MoviesTrending from "./MoviesTrending";

export default function MoviesMovies() {
  return (
    <section className="mb-37.5">
      <div className="container">
        <div className="border border-[#262626] p-12.5 rounded-lg">
          <div className="mb-25">
            <MovieGenres
              title="Our Genres"
              API_URL="&vote_count.gte=200"
              Key="genre-movies"
              inMovie
            />
          </div>
          <div className="mb-25">
            <MovieGenres
              title="Popular Top 10 In Genres"
              API_URL="sort_by=popularity.desc"
              Key="genre-popularity"
              top
              inMovie
            />
          </div>
          <div className="mb-25">
            <MoviesTrending
              key="Trending Now"
              title="Trending Now"
              url="/trending/movie/day?language=en-US"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
