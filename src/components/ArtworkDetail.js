// ArtworkDetail.js
import React from 'react';

function Detail({ label, value }) {
  return (
    <p className="text-gray-600 mb-4 h-12">
      <span className="font-bold">{label}:</span> {value}
    </p>
  );
}

function ArtworkDetail({ artwork, onBack }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="px-3 py-2 rounded bg-blue-500 text-white mb-4"
        style={{ width: '250px' }}
      >
        Back to List
      </button>
      <div className="border border-gray-300 p-4 rounded" style={{ width: '450px' }}>
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={artwork.title}
          className="w-full h-80 object-cover mb-4"
        />
        <p className="text-lg font-semibold mb-4 h-14">Title: {artwork.title}</p>
        <Detail label="Artist Name" value={artwork.artist_display} />
        <Detail label="Artwork Date" value={artwork.date_display} />
        <Detail label="Artwork Reference Number" value={artwork.main_reference_number} />
        <Detail label="Artwork Dimension" value={artwork.dimensions} />
      </div>
    </div>
  );
}

export default ArtworkDetail;
