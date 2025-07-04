import React from 'react';

const Pagination = ({ totalResults = 24797, perPage = 25, currentPage = 1, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / perPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange && onPageChange(page);
    }
  };

  // Calculate visible page numbers (simple logic for up to 5 pages)
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white">
      {/* Left - Results Info */}
      <div className="text-sm">
        <span className="font-inter font-semibold text-sm">
          {((currentPage - 1) * perPage) + 1} - {Math.min(currentPage * perPage, totalResults)} of {totalResults} results found
        </span>
      </div>

      {/* Center - Pagination */}
      <div className="flex items-center space-x-2 text-sm">
        <button onClick={() => goToPage(currentPage - 1)} className="text-white" disabled={currentPage === 1}>&lt;</button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-6 h-6 rounded-full ${currentPage === page ? 'text-white bg-blue-600' : 'text-gray-400'}`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && <span>...</span>}

        <button onClick={() => goToPage(totalPages)} className="hover:text-gray-400" disabled={currentPage === totalPages}>{totalPages}</button>
        <button onClick={() => goToPage(currentPage + 1)} className="text-white" disabled={currentPage === totalPages}>&gt;</button>
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
