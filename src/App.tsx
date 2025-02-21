import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import { FiltersType } from "./types/FilterType";


function App() {
  const [filters, setFilters] = useState<FiltersType>({
    genres: [],
    yearStart: "",
    yearEnd: "",
    ratingMin: "",
    ratingMax: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  

  return (
    <>
      <Header
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        
      />
      <Routes>
      <Route 
          path="/" 
          element={<HomePage filters={filters} searchQuery={searchQuery} />} 
        />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;


