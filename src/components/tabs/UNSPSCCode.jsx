import React, { useState } from "react";
import { Trash2, Search } from "lucide-react";

const MOCK_DATA = [
  { code: "10000000", description: "Live Plant and Animal Material" },
  { code: "10100000", description: "Live animals" },
  { code: "10101500", description: "Livestock" },
  { code: "10101600", description: "Poultry" },
  { code: "10101700", description: "Aquatic animals" },
  { code: "11000000", description: "Mineral and Textile Materials" },
  { code: "11100000", description: "Minerals" },
  { code: "11101500", description: "Metallic minerals" },
  { code: "11101600", description: "Non-metallic minerals" },
  { code: "12000000", description: "Chemical including Bio Chemicals" },
];

const UNSPSCCode = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (item) => {
    const exists = selected.find((s) => s.code === item.code);
    const updated = exists
      ? selected.filter((s) => s.code !== item.code)
      : [...selected, item];
    setSelected(updated);
  };

  const removeSelected = (code) => {
    const updated = selected.filter((item) => item.code !== code);
    setSelected(updated);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-10 ps-14 overflow-y-auto">
      <div>
        {/* Search Bar (non-functional) */}
        <div className="flex justify-end mb-8">
          <div className="relative w-[340px]">
            <input
              type="text"
              placeholder="Search by code or description"
              className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
              size={18}
            />
          </div>
        </div>

        {/* Selected Items */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-p font-medium font-inter">
            Selected UNSPSC Codes{" "}
            <span className="text-primary">({selected.length})</span>
          </h2>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-lg underline font-inter"
            >
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
            <button
              onClick={() => removeSelected(item.code)}
              className="text-primary ml-4"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {/* Mock List */}
        <div className="border-[#273BE280] border-[2px] rounded-[10px] mt-6 overflow-y-auto">
          <div className="text-p font-medium font-inter border-b px-4 py-3">
            Available UNSPSC Codes
          </div>
          {MOCK_DATA.map((cat) => {
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
                <div className="text-[16px]">
                  {cat.description || "No description"}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all">
          Cancel
        </button>
        <button className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all">
          Search
        </button>
      </div>
    </div>
  );
};

export default UNSPSCCode;
