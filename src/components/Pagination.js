import React from "react";

function PaginationButtons({ currentPage, totalPages, handlePageChange }) {
  return (
    <nav className="flex items-center gap-x-1 mt-8 mb-8"> {/* Added gap-x-1 class */}
      {/* Button to navigate to the previous set of 10 pages */}
      <button
        type="button"
        onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
        disabled={currentPage <= 10}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        &lt;&lt;
      </button>

      {/* Button to navigate to the previous page */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        &lt;
      </button>

      {/* Display individual page buttons */}
      {Array.from(
          { length: Math.min(totalPages, window.innerWidth < 640 ? 5 : 10) },
        (_, i) => Math.max(1, currentPage - 5) + i
      ).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`}
        >
          {page}
        </button>
      ))}

      {/* Button to navigate to the next page */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        &gt;
      </button>

      {/* Button to navigate to the next set of 10 pages */}
      <button
        type="button"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 10))}
        disabled={currentPage + 10 > totalPages}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        &gt;&gt;
      </button>
    </nav>
  );
}

export default PaginationButtons;
