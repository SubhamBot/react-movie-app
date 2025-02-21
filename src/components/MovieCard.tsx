import { useState } from "react";
import { Movie } from "../types/Movie";
import { Heart, X } from "lucide-react";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 relative cursor-pointer
                   hover:border-2 hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.8)] dark:bg-gray-800 dark:text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label="Add to favorites"
          className="z-10 absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-500 dark:text-gray-300"
            }`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
        <div className="relative w-full aspect-w-2 aspect-h-3">
          <img
            src={BASE_URL + movie?.poster_path}
            alt={`${movie?.title} poster`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="cards p-3">
          <h2 className="text-base font-bold mb-1 line-clamp-1 transition-colors group-hover:text-yellow-500 dark:group-hover:text-yellow-400">
            {movie?.title}
          </h2>
          <div className="flex items-center mb-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {movie?.vote_average?.toFixed(1)}
            </span>
            <span className="ml-2 text-gray-600 text-xs dark:text-gray-400">
              {movie?.release_date?.split("-")[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Movie Details Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white text-black dark:bg-gray-900 dark:text-white rounded-lg p-6 w-full max-w-2xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="w-full rounded-lg"
              />
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{movie.overview}</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Release Date:</span>{" "}
                    {movie.release_date}
                  </p>
                  <p>
                    <span className="font-semibold">Rating:</span>{" "}
                    {movie.vote_average.toFixed(1)}/10
                  </p>
                  <p>
                    <span className="font-semibold">Popularity:</span>{" "}
                    {movie.popularity}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                  }}
                  className="mt-4 flex items-center gap-2 text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "fill-yellow-500" : "fill-none"
                    }`}
                  />
                  <span>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;


