import React, { useState } from "react";

const SavedSearchForm = () => {
  const [searchOption, setSearchOption] = useState("create"); // "create" | "replace"
  const [searchName, setSearchName] = useState(""); // dummy input value
  const [selectedSavedSearch, setSelectedSavedSearch] = useState(""); // dropdown
  const [defaultSearch, setDefaultSearch] = useState(false); // checkbox

  return (
    <form className="min-h-screen flex flex-col justify-between p-10 bg-white">
      <div>
        <h2 className="font-medium mb-4 font-inter text-p">Search</h2>

        {/* Radio buttons */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="searchOption"
              value="create"
              className="accent-blue-600"
              checked={searchOption === "create"}
              onChange={() => setSearchOption("create")}
            />
            <span className="font-inter text-[22px]">Create a new saved search</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="searchOption"
              value="replace"
              className="accent-blue-600"
              checked={searchOption === "replace"}
              onChange={() => setSearchOption("replace")}
            />
            <span className="font-inter text-[22px]">Replace an existing saved search</span>
          </label>
        </div>

        {/* Conditional rendering */}
        {searchOption === "create" ? (
          <>
            <label className="block font-medium mb-4 font-inter text-p mt-8">Search Name</label>
            <input
              type="text"
              placeholder="Enter search name"
              className="border border-[#273BE280] rounded-lg px-4 py-2 font-inter text-xl"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </>
        ) : (
          <div className="form-group mt-8">
            <label className="font-medium mb-4 font-inter text-p block">
              Replace an existing saved search
            </label>
            <select
              className="form-control border border-primary rounded-lg px-4 py-2 font-inter text-xl"
              value={selectedSavedSearch}
              onChange={(e) => setSelectedSavedSearch(e.target.value)}
            >
              <option value="">Select saved search</option>
              <option value="1">Saved Search 1</option>
              <option value="2">Saved Search 2</option>
            </select>
          </div>
        )}

        {/* Checkbox */}
        <div className="mt-6 flex items-center space-x-2">
          <input
            type="checkbox"
            id="defaultSearch"
            className="accent-primary"
            checked={defaultSearch}
            onChange={() => setDefaultSearch(!defaultSearch)}
          />
          <label htmlFor="defaultSearch" className="font-inter text-[22px] cursor-pointer">
            Set as Default Search
          </label>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button
          type="button"
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
          onClick={() => alert("Cancel clicked (Dummy)")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
          onClick={(e) => {
            e.preventDefault();
            alert("Save clicked (Dummy)");
          }}
        >
          Save Search
        </button>
      </div>
    </form>
  );
};

export default SavedSearchForm;