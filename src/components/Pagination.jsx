import React, { useState } from 'react';

const Pagination = ({ totalResults = 24797, perPage = 25 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalResults / perPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white">
      {/* Left - Results Info */}
      <div className="text-sm">
        <span className="font-inter font-semibold text-sm">1 - {perPage} of {totalResults} results found</span>
      </div>

      {/* Center - Pagination */}
      <div className="flex items-center space-x-2 text-sm">
        <button onClick={() => goToPage(currentPage - 1)} className="text-white">&lt;</button>

        {[...Array(5)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-6 h-6 rounded-full ${
                currentPage === page ? 'text-white' : 'text-gray-400'
              }`}
            >
              {page}
            </button>
          );
        })}

        <span>...</span>

        <button onClick={() => goToPage(totalPages)} className="hover:text-gray-400">{totalPages}</button>
        <button onClick={() => goToPage(currentPage + 1)} className="text-white">&gt;</button>
      </div>

      {/* Right - Results per page */}
      <div className="text-sm flex items-center gap-2">
        <span className='font-inter font-semibold text-sm'>Result per page:</span>
        <span className="px-2 py-1 rounded bg-btn text-white">{perPage}</span>
      </div>
    </div>
  );
};

export default Pagination;
