import MovieGenres from "@/components/ui/MovieGenres";

export default function HomeExplore() {
  return (
    <section>
      <div className="container">
        <MovieGenres
          title="Our Genres"
          API_URL="&vote_count.gte=200"
          Key="genre-movies"
        />
      </div>
    </section>
  );
}
