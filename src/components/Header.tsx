import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, X, Heart } from "lucide-react";
import { FiltersType } from "../types/FilterType";
import logo from "./Logo.png"; 
import DarkMode from "./DarkMode";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  
}

const Header = ({ filters, setFilters, searchQuery, setSearchQuery }: HeaderProps) => {
  const navigate = useNavigate();
  const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
          headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
        });
        const data = await response.json();
        setAllGenres(data.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, [TMDB_BEARER_TOKEN]);

  useEffect(() => {
    console.log(5)
    const handler = setTimeout(() => {
      setSearchQuery(debouncedQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [debouncedQuery, setSearchQuery]);

  const clearFilters = () => {
    setFilters({ genres: [], yearStart: "", yearEnd: "", ratingMin: "", ratingMax: "" });
  };

  return (
    <header id="2" className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-20 flex items-center justify-between">
        {/* Logo Image */}
        <img src={logo} alt="Popcorn Logo" className="h-28 w-28 md:h-12 md:w-12 object-contain bg-none"/>
        <h1 className="text-lg md:text-2xl px-0 font-bold text-yellow-500">
          <Link to="/">Popcorn Grinder</Link>
        </h1>

        {/* Search Input */}
        <div className="relative flex-1 min-w-[300px] w-full px-3 md:order-none order-last">
          <input
            type="text"
            placeholder="Search movies..."
            value={debouncedQuery}
            onFocus={() => navigate("/")}
            onChange={(e) => setDebouncedQuery(e.target.value)}
            className="w-full p-3 pl-10 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          {searchQuery && (
            <button onClick={() => setDebouncedQuery("")} className="absolute right-10 top-3 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Favorites & Filter Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-yellow-500 transition">
            <Heart className="h-5 w-5" />
            
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 hover:text-yellow-500 transition">
            <Filter className="h-5 w-5" />
          </button>
          <DarkMode />
        </div>
      </div>

      {/* Filters Panel (Appears Below Header, Smaller Size) */}
      {isOpen && (
        <div className="fixed md:absolute left-0 md:left-auto right-0 md:right-1 top-0 md:top-auto mt-0 md:mt-2 w-full md:w-[30rem] h-screen md:h-auto p-2 bg-white md:rounded-lg shadow-xl border-l md:border border-gray-200 z-50 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Year</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.yearStart}
                  onChange={(e) => setFilters((prev) => ({ ...prev, yearStart: e.target.value }))}
                  placeholder="From"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="number"
                  value={filters.yearEnd}
                  onChange={(e) => setFilters((prev) => ({ ...prev, yearEnd: e.target.value }))}
                  placeholder="To"
                  className="w-1/2 p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm">Rating</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.ratingMin}
                  onChange={(e) => setFilters((prev) => ({ ...prev, ratingMin: e.target.value }))}
                  placeholder="Min"
                  className="w-1/2 p-2 border rounded"
                  step="0.1"
                />
                <input
                  type="number"
                  value={filters.ratingMax}
                  onChange={(e) => setFilters((prev) => ({ ...prev, ratingMax: e.target.value }))}
                  placeholder="Max"
                  className="w-1/2 p-2 border rounded"
                  step="0.1"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm">Genres</label>
              <div className="grid grid-cols-2 gap-2">
                {allGenres.map((genre) => (
                  <label key={genre.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.genres.includes(genre.id)}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          genres: e.target.checked ? [...prev.genres, genre.id] : prev.genres.filter((g) => g !== genre.id),
                        }))
                      }
                    />
                    {genre.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button onClick={clearFilters} className="mt-4 w-full bg-red-500 text-white p-2 rounded">
            Clear Filters
          </button>
          <button onClick={() => setIsOpen(false)} className="mt-2 w-full bg-gray-300 p-2 rounded">
            Close
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;



