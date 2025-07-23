import React, { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import api from "../../utils/axios";

const SolicitationTypeTab = ({
  filters = {},
  setFilters = () => {},
  onApply = () => {},
}) => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await api.get("/bids/solicitation/");
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setOptions(sorted);
      } catch (err) {
        console.error("Error fetching bid types:", err);
      }
    };
    fetchTypes();
  }, []);

  const selectedNames = Array.isArray(filters.solicitationType)
    ? filters.solicitationType
    : [];

  const filteredOptions = options.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (item) => {
    const isAlreadySelected = selectedNames.includes(item.name);
    const updated = isAlreadySelected
      ? selectedNames.filter((name) => name !== item.name)
      : [...selectedNames, item.name];

    setFilters((prev) => ({
      ...prev,
      solicitationType: updated,
    }));
  };

  const removeSelected = (name) => {
    const updated = selectedNames.filter((n) => n !== name);
    setFilters((prev) => ({
      ...prev,
      solicitationType: updated,
    }));
  };

  const handleCancel = () => {
    setFilters((prev) => ({
      ...prev,
      solicitationType: [],
    }));
    onApply?.();
  };

  const handleApply = () => {
    onApply?.();
  };

  const allVisibleNames = filteredOptions.map((item) => item.name);
  const isAllSelected =
    allVisibleNames.length > 0 &&
    allVisibleNames.every((name) => selectedNames.includes(name));

  const toggleAllVisible = () => {
    if (isAllSelected) {
      const remaining = selectedNames.filter(
        (name) => !allVisibleNames.includes(name)
      );
      setFilters((prev) => ({
        ...prev,
        solicitationType: remaining,
      }));
    } else {
      const combined = Array.from(
        new Set([...selectedNames, ...allVisibleNames])
      );
      setFilters((prev) => ({
        ...prev,
        solicitationType: combined,
      }));
    }
  };

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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
          </div>
        </div>

        {/* Selected Chips */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-p font-medium font-inter">
            Selected Types <span className="text-primary">({selectedNames.length})</span>
          </h2>
          {selectedNames.length > 0 && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, solicitationType: [] }))}
              className="text-lg underline font-inter"
            >
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
              <button onClick={() => removeSelected(name)} className="text-primary">
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

          {/* Filtered Bid Types */}
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
                  onChange={() => toggleSelect(item)}
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
          onClick={handleCancel}
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SolicitationTypeTab;
