
import React from 'react';

function StatusTab({
  filters,
  setFilters,
  onApply,
  setActiveTab,
  searchOption,
  setShowValidation,
  setTriggerSave,
}) {
 const handleSearchClick = () => {
  const isEmpty = searchOption === "create" && !filters.searchName?.trim();

  if (isEmpty) {
    setShowValidation?.(true);
    setActiveTab?.("Save Search Form");
    return;
  }

  if (searchOption === "create") {
    setTriggerSave?.(true); // SaveSearch mode
  } else {
    onApply?.(); // Filter mode: CLOSE FILTER PANEL
  }
};


  const handleCancel = () => {
    setFilters((prev) => ({
      ...prev,
      status: "",
      personalised: "",
    }));
    setShowValidation?.(false);
    setActiveTab?.("Save Search Form");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-10 ps-14">
      <div>
        <div className="space-y-6">
          {/* Solicitations Radio Group */}
          <div>
            <h2 className="text-p font-inter font-medium mb-2">Solicitations</h2>
            <div className="space-y-3">
              {["Open Solicitations", "Closed Solicitations", "Awarded Solicitations"].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="solicitation"
                    value={option}
                    checked={filters.status === option}
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, status: option }))
                    }
                    className="accent-purple-600"
                  />
                  <span className="font-inter text-xl">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personalised */}
          <div>
            <h2 className="text-p font-inter font-medium mb-2">Personalised</h2>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="personalised"
                value="My Invitations Only"
                checked={filters.personalised === 'My Invitations Only'}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, personalised: 'My Invitations Only' }))
                }
                className="accent-purple-600"
              />
              <span className="font-inter text-xl">My Invitations Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-10">
        <button
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default StatusTab;
