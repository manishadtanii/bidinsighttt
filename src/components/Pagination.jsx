import React, { useState, useEffect } from 'react';

const Pagination = ({ totalResults = 24797, perPage = 25, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / perPage);
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage); // sync input field with prop
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page !== currentPage && page >= 1 && page <= totalPages) {
      goToPage(page);
    } else {
      setInputPage(currentPage);
    }
  };

  const startResult = (currentPage - 1) * perPage + 1;
  const endResult = Math.min(currentPage * perPage, totalResults);

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white flex-wrap gap-3">
      {/* Left - Results Info */}
      <div className="text-sm">
        <span className="font-inter font-semibold text-sm">
          {startResult} - {endResult} of {totalResults} results
        </span>
      </div>

      {/* Center - Pagination */}
      <div className="flex items-center gap-1 text-sm bg-btn px-3 py-2 rounded-full">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="px-3 py-1 font-bold text-white bg-blue-600 rounded-full flex items-center gap-2">
          Page
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-10 text-center bg-transparent border-b border-white outline-none"
          />
          of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1"
          disabled={currentPage === totalPages}
        >
          Next
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
  