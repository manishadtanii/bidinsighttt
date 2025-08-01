import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Trash2, Search } from "lucide-react";
import { getAllStates } from "../../services/bid.service.js";

const US_STATES = [/* fallback states if needed */];

const LocationTab = ({ filters = {}, setFilters = () => {} }) => {
  const [selectedStates, setSelectedStates] = useState(filters.location || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch & sort states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await getAllStates();
        const sorted = response.sort((a, b) =>
          (a.name || a).toLowerCase().localeCompare((b.name || b).toLowerCase())
        );
        setStates(sorted);
      } catch {
        const fallbackSorted = US_STATES
          .map((name) => ({ name }))
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setStates(fallbackSorted);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  // Sync with external filters
  useEffect(() => {
    if (Array.isArray(filters.location)) {
      setSelectedStates(filters.location);
    }
  }, [filters.location]);

  const filteredStates = useMemo(() => {
    return states.filter((state) =>
      (state.name || state).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, states]);

  const visibleStateNames = useMemo(() => {
    return filteredStates.map((state) => state.name || state);
  }, [filteredStates]);

  const isAllSelected = useMemo(() => {
    return (
      visibleStateNames.length > 0 &&
      visibleStateNames.every((name) => selectedStates.includes(name))
    );
  }, [visibleStateNames, selectedStates]);

  const updateFilter = useCallback((updated) => {
    setSelectedStates(updated);
    setFilters((prev) => ({ ...prev, location: updated }));
  }, [setFilters]);

  const toggleState = useCallback((name) => {
    const updated = selectedStates.includes(name)
      ? selectedStates.filter((s) => s !== name)
      : [...selectedStates, name];
    updateFilter(updated);
  }, [selectedStates, updateFilter]);

  const toggleSelectAll = useCallback(() => {
    const updated = isAllSelected
      ? selectedStates.filter((s) => !visibleStateNames.includes(s))
      : Array.from(new Set([...selectedStates, ...visibleStateNames]));
    updateFilter(updated);
  }, [isAllSelected, selectedStates, visibleStateNames, updateFilter]);

  const clearAll = useCallback(() => {
    updateFilter([]);
  }, [updateFilter]);

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
          {selectedStates.map((name) => (
            <div
              key={name}
              className="flex border-[2px] gap-1 px-3 rounded-[30px] border-primary items-center text-lg py-1 font-inter"
            >
              <div>{name}</div>
              <button
                onClick={() => toggleState(name)}
                className="text-primary"
                aria-label={`Remove ${name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* State List */}
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

          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading states...</div>
          ) : filteredStates.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No states found</div>
          ) : (
            filteredStates.map((state) => {
              const name = state.name || state;
              const checked = selectedStates.includes(name);
              return (
                <label
                  key={name}
                  className="flex items-center gap-5 py-2 cursor-pointer font-inter px-4 text-xl border-[#273BE280] border-t-[2px]"
                >
                  <input
                    type="checkbox"
                    className="mt-1 accent-primary"
                    checked={checked}
                    onChange={() => toggleState(name)}
                    aria-label={`Select state ${name}`}
                  />
                  <div className="text-[16px]">{name}</div>
                </label>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
