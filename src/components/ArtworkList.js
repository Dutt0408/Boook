// ArtworkList.js
import React from "react";

function ArtworkList({ artworks, onItemClick }) {
  // Default artwork image URL
  const defaultImageURL = "https://www.shutterstock.com/image-vector/image-icon-260nw-211642900.jpg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {artworks.map((artwork) => {
        console.log(artwork);

        return (
          <div
            key={artwork.id}
            className="border border-gray-300 p-4 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            onClick={() => onItemClick(artwork)}
          >
            {artwork.thumbnail ? (
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className="w-48 h-48 object-cover mb-2 "
              />
            ) : (
              <img
                src={defaultImageURL}
                alt={artwork.title}
                className="w-48 h-48 object-cover mb-2 "
              />
            )}

            <p className="text-lg font-semibold">{artwork.title}</p>
            <p className="text-gray-600">{artwork.artist_display}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ArtworkList;
