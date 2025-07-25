import React, { useState, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";

const SolicitationTypeTab = ({
  filters = {},
  setFilters = () => {},
  onApply = () => {},
}) => {
  // Mock static options list (replace with your real data if needed)
  const options = [
  { name: "Type A" },
  { name: "Type B" },
  { name: "Type C" },
  { name: "Type D" },
  { name: "Type E" },
  { name: "Type F" },
  { name: "Type G" },
  { name: "Type H" },
  { name: "Type I" },
  { name: "Type J" },
  { name: "Type K" },
  { name: "Type L" },
  { name: "Type M" },
  { name: "Type N" },
  { name: "Type O" },
  { name: "Type P" },
  { name: "Type Q" },
  { name: "Type R" },
  { name: "Type S" },
  { name: "Type T" },
  { name: "Type U" },
  { name: "Type V" },
];


  // Initialize selected names from props or empty array
  const initialSelected = Array.isArray(filters.solicitationType)
    ? filters.solicitationType
    : [];

  // Local state to handle selected solicitation types
  const [selectedNames, setSelectedNames] = useState(initialSelected);
  const [searchTerm, setSearchTerm] = useState("");

  // Sync from filters prop if external changes come in
  useEffect(() => {
    setSelectedNames(initialSelected);
  }, [filters.solicitationType]);

  // Filter options by search term (simple client side filtering)
  const filteredOptions = options.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle selection for one item
  const toggleSelect = (name) => {
    setSelectedNames((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((n) => n !== name);
      }
      return [...prevSelected, name];
    });
  };

  // Clear all selected
  const clearAll = () => {
    setSelectedNames([]);
  };

  // "Select All" checkbox state
  const allVisibleNames = filteredOptions.map((item) => item.name);
  const isAllSelected =
    allVisibleNames.length > 0 &&
    allVisibleNames.every((name) => selectedNames.includes(name));

  // Toggle all visible options
  const toggleAllVisible = () => {
    if (isAllSelected) {
      // Remove all visible from selected
      setSelectedNames((prevSelected) =>
        prevSelected.filter((name) => !allVisibleNames.includes(name))
      );
    } else {
      // Add all visible options to selected (avoid duplicates)
      setSelectedNames((prevSelected) =>
        Array.from(new Set([...prevSelected, ...allVisibleNames]))
      );
    }
  };

  // Sync selected to external filters (optional - call setFilters when selected changes)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      solicitationType: selectedNames,
    }));
  }, [selectedNames, setFilters]);

  return (
    <div className="min-h-screen flex flex-col justify-between p-10 ps-14">
      <div>
        {/* Search Bar */}
        <div className="flex justify-end mb-8">
          <div className="relative w-[340px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bid types"
              className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
              size={18}
            />
          </div>
        </div>

        {/* Selected Chips */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-p font-medium font-inter">
            Selected Types <span className="text-primary">({selectedNames.length})</span>
          </h2>
          {selectedNames.length > 0 && (
            <button onClick={clearAll} className="text-lg underline font-inter">
              Clear All
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {selectedNames.map((name) => (
            <div
              key={name}
              className="flex items-center border-[2px] border-primary rounded-full px-4 py-1 text-sm gap-2"
            >
              <span>{name}</span>
              <button
                onClick={() => toggleSelect(name)}
                className="text-primary"
                aria-label={`Remove ${name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Select All Toggle */}
        <div className="border-[2px] border-[#273BE280] rounded-[10px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#273BE280] bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-primary"
                checked={isAllSelected}
                onChange={toggleAllVisible}
              />
              <span className="text-p font-inter font-medium">Select All</span>
            </div>
          </div>

          {/* Filtered Bid Types List */}
          <div className="divide-y divide-[#273BE280] max-h-[400px] overflow-y-auto">
            {filteredOptions.map((item) => (
              <label
                key={item.name}
                className="flex items-center px-4 py-2 cursor-pointer text-[16px] font-inter"
              >
                <input
                  type="checkbox"
                  className="accent-primary mr-3"
                  checked={selectedNames.includes(item.name)}
                  onChange={() => toggleSelect(item.name)}
                />
                <span className="text-gray-800">{item.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button
          onClick={() => {
            // Optionally reset all selections on Cancel
            clearAll();
            onApply();
          }}
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onApply();
          }}
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SolicitationTypeTab;
