import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtworkList from "./components/ArtworkList";
import ArtworkDetail from "./components/ArtworkDetail";
import CommentsForm from "./components/CommentsForm";
import FilterDropdown from "./components/FilterDropdown";
import SearchBar from "./components/Searchbar";
import PaginationButtons from "./components/Pagination";

const API_URL = "https://api.artic.edu/api/v1/artworks";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  // eslint-disable-next-line
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fetchedArtworks, setFetchedArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          params: {
            page: currentPage,
            category: categoryFilter,
            q: searchTerm,
          },
        });
        setArtworks(response.data.data);
        setTotalPages(response.data.pagination.total_pages);
        setFetchedArtworks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [currentPage, categoryFilter, searchTerm]);

  useEffect(() => {
    const filtered = fetchedArtworks.filter((artwork) => {
      const titleMatch = artwork.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        categoryFilter === "" || artwork.category === categoryFilter;
      return titleMatch && categoryMatch;
    });
    setArtworks(filtered);
  }, [searchTerm, categoryFilter, fetchedArtworks, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleBackToList = () => {
    setSelectedArtwork(null);
  };

  const handleSearch = async (term) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/search`, {
        params: {
          q: term,
        },
      });
      const searchData = response.data.data;

      // Fetch artwork details and construct image URLs
      const artworkDetails = await Promise.all(
        searchData.map(async (artwork) => {
          const artworkResponse = await axios.get(`${API_URL}/${artwork.id}`, {
            params: {
              fields: "id,title,image_id",
            },
          });
          const imageData = artworkResponse.data.data;
          const imageUrl = `https://www.artic.edu/iiif/2/${imageData.image_id}/full/843,/0/default.jpg`;

          // Return artwork details with image URL
          return {
            ...artwork,
            imageUrl: imageUrl,
          };
        })
      );
      setArtworks(artworkDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error searching artworks:", error);
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  return (
    <div className="container mx-auto p-4">
      <h1
        className="text-3xl font-bold mb-4 text-gray-900"
        style={{
          fontFamily: "Brush Script MT, Brush Script Std, cursive",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Artwork Gallery
      </h1>

      {selectedArtwork ? (
        <ArtworkDetail artwork={selectedArtwork} onBack={handleBackToList} />
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <SearchBar onSearch={handleSearch} />
            <FilterDropdown
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryFilter}
            />
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />

              {artworks.length === 0 && searchTerm !== "" ? (
                <p>No results found.</p>
              ) : (
                <>
                  <ArtworkList
                    artworks={artworks}
                    onItemClick={handleArtworkClick}
                  />

                  <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
      <CommentsForm />
    </div>
  );
}

export default App;
