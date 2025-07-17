

import React, { useEffect } from "react";

const SavedSearchForm = ({
  filters,
  setFilters,
  onCancel,
  onSubmit,
  savedFilters = [],
  defaultSearch,
  setDefaultSearch,
  searchOption,
  setSearchOption,
  selectedSavedSearch,
  setSelectedSavedSearch,
  showValidation = false,
  setShowValidation = () => {},
  triggerSave = false,
  setTriggerSave = () => {},
}) => {
  const savedSearches = Array.isArray(savedFilters)
    ? savedFilters.map((item) => item.search_name || item.name)
    : [];

  const handleFormSubmit = () => {
    if (searchOption === "replace" && !selectedSavedSearch) {
      alert("Please select a saved search to replace.");
      return;
    }

    if (searchOption === "create" && !filters.searchName.trim()) {
      setShowValidation(true);
      return;
    }

    const data = {
      action: searchOption,
      name: searchOption === "create" ? filters.searchName : selectedSavedSearch,
      isDefault: defaultSearch,
    };

    onSubmit?.(data);
    setShowValidation(false);
  };

  // Form submit by button
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  // Auto trigger from other tabs
useEffect(() => {
  if (triggerSave) {
    handleFormSubmit(); // ✅ correct method
    setTriggerSave(false);
  }
}, [triggerSave]);



  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col justify-between p-10 bg-white"
    >
      <div>
        <h2 className="font-medium mb-4 font-inter text-p">Search</h2>

        {/* Radio options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="searchOption"
              value="create"
              checked={searchOption === "create"}
              onChange={() => setSearchOption("create")}
              className="accent-blue-600"
            />
            <span className="font-inter text-[22px]">Create a new saved search</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="searchOption"
              value="replace"
              checked={searchOption === "replace"}
              onChange={() => setSearchOption("replace")}
              className="accent-blue-600"
            />
            <span className="font-inter text-[22px]">Replace an existing saved search</span>
          </label>
        </div>

        {/* Input or Dropdown */}
        <div className="mt-8">
          <label className="block font-medium mb-4 font-inter text-p">Search Name</label>

          {searchOption === "create" ? (
            <>
              <input
                type="text"
                placeholder="Enter search name"
                value={filters.searchName}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchName: e.target.value,
                  }))
                }
                className={`border ${
                  showValidation && !filters.searchName?.trim()
                    ? "border-red-500"
                    : "border-[#273BE280]"
                } rounded-lg px-4 py-2 font-inter text-xl`}
              />
              {showValidation && !filters.searchName?.trim() && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </>
          ) : (
            <div className="border border-primary bg-btn rounded-full px-4 py-2 inline-block">
              <select
                value={selectedSavedSearch}
                onChange={(e) => setSelectedSavedSearch(e.target.value)}
              >
                <option value="" disabled hidden>
                  My Saved Searches
                </option>
                {savedSearches.map((search) => (
                  <option key={search} value={search}>
                    {search}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Default checkbox */}
        <div className="mt-6 flex items-center space-x-2">
          <input
            type="checkbox"
            id="defaultSearch"
            checked={defaultSearch}
            onChange={() => setDefaultSearch(!defaultSearch)}
            className="accent-primary"
          />
          <label htmlFor="defaultSearch" className="font-inter text-[22px]">
            Set as Default Search
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button
          type="button"
          onClick={onCancel}
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Save Search
        </button>
      </div>
    </form>
  );
};

export default SavedSearchForm;
