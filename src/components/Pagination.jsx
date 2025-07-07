import React from 'react';

const Pagination = ({ totalResults = 24797, perPage = 25, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / perPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startResult = (currentPage - 1) * perPage + 1;
  const endResult = Math.min(currentPage * perPage, totalResults);

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white">
      {/* Left - Results Info */}
      <div className="text-sm">
        <span className="font-inter font-semibold text-sm">
          {startResult} - {endResult} of {totalResults} results found
        </span>
      </div>

      {/* Center - Pagination */}
      <div className="flex items-center space-x-2 text-sm">
        <button onClick={() => goToPage(currentPage - 1)} className="text-white" disabled={currentPage === 1}>
          &lt;
        </button>

        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 rounded-full ${
              currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-400'
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage + 2 < totalPages && <span>...</span>}

        {currentPage + 2 < totalPages && (
          <button onClick={() => goToPage(totalPages)} className="hover:text-gray-400">
            {totalPages}
          </button>
        )}

        <button onClick={() => goToPage(currentPage + 1)} className="text-white" disabled={currentPage === totalPages}>
          &gt;
        </button>
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
