import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movie";
import { FiltersType } from "../types/FilterType";

interface HomePageProps {
  filters: FiltersType;
  searchQuery: string;
}

function HomePage({ filters, searchQuery }: HomePageProps) {
  const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
  const TMDB_API_BASE = import.meta.env.VITE_TMDB_API_BASE;
  const TMDB_SEARCH_MOVIE = import.meta.env.VITE_TMDB_SEARCH_MOVIE;
  const TMDB_DISCOVER_MOVIE = import.meta.env.VITE_TMDB_DISCOVER_MOVIE;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("movie_app_favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery, filters]);

  useEffect(() => {
    const fetchMovies = async (currentPage: number, searchQuery: string, filters: FiltersType) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      let url = `${TMDB_API_BASE}${searchQuery ? TMDB_SEARCH_MOVIE : TMDB_DISCOVER_MOVIE}?include_adult=false&language=en-US&page=${currentPage}`;

      const apiFilters = [];

      if (filters.yearStart || filters.yearEnd) {
        if (filters.yearStart) apiFilters.push(`primary_release_date.gte=${filters.yearStart}-01-01`);
        if (filters.yearEnd) apiFilters.push(`primary_release_date.lte=${filters.yearEnd}-12-31`);
      }

      if (filters.ratingMin || filters.ratingMax) {
        if (filters.ratingMin) apiFilters.push(`vote_average.gte=${filters.ratingMin}`);
        if (filters.ratingMax) apiFilters.push(`vote_average.lte=${filters.ratingMax}`);
      }

      if (filters.genres && filters.genres.length > 0) {
        apiFilters.push(`with_genres=${filters.genres.join(",")}`);
      }

      if (apiFilters.length > 0) {
        url += "&" + apiFilters.join("&");
      }

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        },
        signal: abortControllerRef.current.signal,
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (data.results?.length > 0) {
          setMovies((prevMovies) => (currentPage === 1 ? data.results : [...prevMovies, ...data.results]));
          setHasMore(data.page < data.total_pages && data.results.length > 0);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setHasMore(false);
        setLoading(false);
      }
    };

    fetchMovies(page, searchQuery, filters);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [TMDB_API_BASE, TMDB_SEARCH_MOVIE, TMDB_DISCOVER_MOVIE, TMDB_BEARER_TOKEN, filters, page, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  const toggleFavorite = (movie: Movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("movie_app_favorites", JSON.stringify(updatedFavorites));

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <p className="mb-4 text-gray-600">{movies.length} movies loaded</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              onToggleFavorite={() => toggleFavorite(movie)}
            />
          ))}
        </div>

        {loading && <p className="text-center text-gray-500">Loading more movies...</p>}

        <div ref={loaderRef} className="h-10"></div>
      </div>
    </div>
  );
}

export default HomePage;
