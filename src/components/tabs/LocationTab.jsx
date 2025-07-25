import React, { useState } from "react";
import { Trash2, Search } from "lucide-react";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const LocationTab = () => {
  const [selectedStates, setSelectedStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states based on search input
  const filteredStates = US_STATES.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAllSelected =
    filteredStates.length > 0 &&
    filteredStates.every((state) => selectedStates.includes(state));

  const toggleState = (state) => {
    setSelectedStates((prev) =>
      prev.includes(state)
        ? prev.filter((s) => s !== state)
        : [...prev, state]
    );
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      // Remove all visible states from selected
      setSelectedStates((prev) =>
        prev.filter((state) => !filteredStates.includes(state))
      );
    } else {
      // Add all visible states
      setSelectedStates((prev) =>
        Array.from(new Set([...prev, ...filteredStates]))
      );
    }
  };

  const clearAll = () => {
    setSelectedStates([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-10 ps-14">
      <div>
        {/* Search Input */}
        <div className="flex justify-end mb-8">
          <div className="relative w-[340px]">
            <input
              type="text"
              placeholder="Search states"
              className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
              size={18}
            />
          </div>
        </div>

        {/* Selected States */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-p font-medium font-inter">
            Selected States{" "}
            <span className="text-primary">({selectedStates.length})</span>
          </h2>
          {selectedStates.length > 0 && (
            <button
              onClick={clearAll}
              className="text-lg underline font-inter"
              aria-label="Clear all selected states"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {selectedStates.map((state) => (
            <div
              key={state}
              className="flex border-[2px] gap-1 px-3 rounded-[30px] border-primary items-center justify-between text-lg py-1 font-inter"
            >
              <div>{state}</div>
              <button
                onClick={() => toggleState(state)}
                className="text-primary"
                aria-label={`Remove ${state}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* States List with Select All */}
        <div className="border-[#273BE280] border-[2px] rounded-[10px] max-h-[400px] overflow-y-auto">
          <div className="flex items-center px-4 py-3 border-b font-medium font-inter text-p">
            <input
              type="checkbox"
              className="accent-primary mr-3"
              checked={isAllSelected}
              onChange={toggleSelectAll}
              aria-label="Select all visible states"
            />
            <span>Select All States</span>
          </div>

          {filteredStates.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No states found</div>
          ) : (
            filteredStates.map((state) => (
              <label
                key={state}
                className="flex items-center gap-5 py-2 cursor-pointer font-inter px-4 text-xl border-[#273BE280] border-t-[2px]"
              >
                <input
                  type="checkbox"
                  className="mt-1 accent-primary"
                  checked={selectedStates.includes(state)}
                  onChange={() => toggleState(state)}
                  aria-label={`Select state ${state}`}
                />
                <div className="text-[16px]">{state}</div>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Sticky Bottom Buttons */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button
          onClick={() => setSelectedStates([])}
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => alert("Search clicked with selected states: " + selectedStates.join(", "))}
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default LocationTab;
