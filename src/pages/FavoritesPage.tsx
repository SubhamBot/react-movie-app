import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movie";

function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem("movie_app_favorites") || "[]");
      setFavorites(storedFavorites);
    };

    loadFavorites(); // Initial load

    window.addEventListener("storage", loadFavorites);
    return () => window.removeEventListener("storage", loadFavorites);
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("movie_app_favorites", JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div id="fav" className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Favorite Movies ({favorites.length})</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">You haven't added any favorite movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(movie)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;


