import React, { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import api from "../../utils/axios";

const NAICSCode = ({ filters, setFilters, onApply }) => {
  const [naicsData, setNaicsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selected = filters.naics_codes || [];

  const updateSelected = (updatedList) => {
    setFilters((prev) => ({ ...prev, naics_codes: updatedList }));
  };

  const toggleSelect = (item) => {
    const exists = selected.find((s) => s.code === item.code);
    const updated = exists
      ? selected.filter((s) => s.code !== item.code)
      : [...selected, item];
    updateSelected(updated);
  };

  const removeSelected = (code) => {
    const updated = selected.filter((item) => item.code !== code);
    updateSelected(updated);
  };

  useEffect(() => {
    const fetchNAICS = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bids/naics-codes/");
        setNaicsData(res.data.results || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load NAICS codes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNAICS();
  }, []);

  // Filter based on search input
  const filteredData = naicsData.filter((item) =>
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col justify-between p-10 ps-14 overflow-y-auto">
      {/* Search */}
      <div className="flex justify-end mb-8">
        <div className="relative w-[340px]">
          <input
            type="text"
            placeholder="Search by code or description"
            className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
        </div>
      </div>

      {/* Selected Items */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-p font-medium">
          Selected NAICS Codes <span className="text-primary">({selected.length})</span>
        </h2>
        {selected.length > 0 && (
          <button onClick={() => updateSelected([])} className="text-lg underline font-inter">
            Clear All
          </button>
        )}
      </div>

      {selected.map((item) => (
        <div
          key={item.code}
          className="flex items-start justify-between text-sm py-2 border-b font-inter"
        >
          <div className="flex items-center gap-10">
            <div className="font-medium text-lg">{item.code}</div>
            <div>{item.description || "No description"}</div>
          </div>
          <button onClick={() => removeSelected(item.code)} className="text-primary ml-4">
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      {/* API Loading/Error */}
      {loading && <p className="text-center text-gray-500 py-10">Loading NAICS codes...</p>}
      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {/* List */}
      {!loading && !error && (
        <div className="border-[#273BE280] border-[2px] rounded-[10px] mt-6 overflow-y-auto">
          <div className="font-semibold text-md p-2 border-b">Available NAICS Codes</div>
          {filteredData.length === 0 && (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
          {filteredData.map((cat) => {
            const isSelected = selected.some((item) => item.code === cat.code);
            return (
              <label
                key={cat.code}
                className="flex items-center gap-5 py-2 cursor-pointer font-inter px-8 text-xl border-t-[2px] border-[#273BE280]"
              >
                <input
                  type="checkbox"
                  className="mt-1 accent-primary"
                  checked={isSelected}
                  onChange={() => toggleSelect(cat)}
                />
                <div className="font-semibold text-lg">{cat.code}</div>
                <div className="text-[16px]">{cat.description || "No description"}</div>
              </label>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
          onClick={onApply}
        >
          Cancel
        </button>
        <button
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
          onClick={onApply}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default NAICSCode;