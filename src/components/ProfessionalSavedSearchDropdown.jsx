import React, { useState, useRef, useEffect } from 'react';

const ProfessionalSavedSearchDropdown = ({ 
  savedSearches = [], 
  selectedSavedSearch, 
  handleSavedSearchSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef(null);

  // Sort saved searches by creation date (newest first)
  const sortedSearches = [...savedSearches].sort((a, b) => {
    // Assuming there's a createdAt or timestamp field
    // If not available, you can use id (higher id = newer) or any other field
    const dateA = new Date(a.createdAt || a.created_at || a.timestamp || 0);
    const dateB = new Date(b.createdAt || b.created_at || b.timestamp || 0);
    return dateB - dateA; // Newest first
  });

  // Show first 4 items, rest under "More"
  const visibleSearches = sortedSearches.slice(0, 4);
  const hiddenSearches = sortedSearches.slice(4);
  const hasMoreItems = hiddenSearches.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowMore(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (searchId) => {
    const value = searchId === "_default_" ? "_default_" : Number(searchId);
    handleSavedSearchSelect(value);
    setIsOpen(false);
    setShowMore(false);
  };

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const getDisplayText = () => {
    if (!selectedSavedSearch || selectedSavedSearch === "_default_") {
      return "My Saved Searches";
    }
    const selected = savedSearches.find(s => s.id === selectedSavedSearch?.id || s.id === selectedSavedSearch);
    return selected?.name || "My Saved Searches";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div 
        className="saved-search bg-btn p-4 px-6 rounded-[30px] border-none font-inter font-medium cursor-pointer select-none flex items-center justify-between min-w-[200px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white truncate">{getDisplayText()}</span>
        <svg 
          className={`w-4 h-4 text-white transition-transform duration-200 ml-2 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-[40rem] overflow-hidden">
          {/* Default Option */}
          <div
            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer font-inter border-b border-gray-100 ${
              (!selectedSavedSearch || selectedSavedSearch === "_default_") 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-900'
            }`}
            onClick={() => handleSelect("_default_")}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              My Saved Searches
            </div>
          </div>

          {/* Visible Searches */}
          {visibleSearches.length > 0 && (
            <div className="max-h-48 overflow-y-auto">
              {visibleSearches.map((search, index) => (
                <div
                  key={search.id || index}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer font-inter flex items-center justify-between group ${
                    (selectedSavedSearch?.id === search.id || selectedSavedSearch === search.id)
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-900'
                  }`}
                  onClick={() => handleSelect(search.id)}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="truncate">{search.name}</span>
                  </div>
                  {/* Recent Badge for newly created */}
                  {index < 2 && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full flex-shrink-0">
                      Recent
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* More Section */}
          {hasMoreItems && (
            <>
              <div
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer font-inter text-gray-600 border-t border-gray-100 flex items-center justify-between sticky bottom-0 bg-white"
                onClick={toggleMore}
              >
                <div className="flex items-center pl-2">
                  {/* <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg> */}
                  <span className="font-medium">More ({hiddenSearches.length})</span>
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Hidden Searches - Improved with better height and scroll */}
              {showMore && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <div className="max-h-60 overflow-y-auto">
                    <div className="px-3 py-2 text-xs text-gray-500 font-medium uppercase tracking-wide bg-gray-100">
                      Older Searches
                    </div>
                    {hiddenSearches.map((search, index) => (
                      <div
                        key={search.id || `hidden-${index}`}
                        className={`px-4 py-3 hover:bg-white cursor-pointer font-inter flex items-center transition-colors duration-150 ${
                          (selectedSavedSearch?.id === search.id || selectedSavedSearch === search.id)
                            ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500' 
                            : 'text-gray-700'
                        }`}
                        onClick={() => handleSelect(search.id)}
                      >
                        <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="truncate">{search.name}</span>
                      </div>
                    ))}
                    
                    {/* Scroll indicator at bottom */}
                    {hiddenSearches.length > 4 && (
                      <div className="px-4 py-2 text-center text-xs text-gray-400 bg-gray-100">
                        Scroll for more searches
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {savedSearches.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-500 font-inter">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">No saved searches yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfessionalSavedSearchDropdown;