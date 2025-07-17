import React from 'react';
import TagInput from './TagInput';

function KeywordTab({
  filters,
  setFilters,
  onApply,
  setActiveTab,
  searchOption,
  setShowValidation,
  setTriggerSave,
}) {
  const includeTags = filters.includeKeywords || [];
  const excludeTags = filters.excludeKeywords || [];

  const handleIncludeChange = (tags) => {
    setFilters((prev) => ({
      ...prev,
      includeKeywords: tags,
    }));
  };

  const handleExcludeChange = (tags) => {
    setFilters((prev) => ({
      ...prev,
      excludeKeywords: tags,
    }));
  };

  const handleSearchClick = () => {
    const isCreateMode = searchOption === "create";
    const isEmpty = isCreateMode && !filters.searchName?.trim();

    if (isEmpty) {
      setShowValidation?.(true);
      setActiveTab?.("Save Search Form");
      return;
    }

    if (isCreateMode) {
      setTriggerSave?.(true);
    } else {
      onApply?.();
    }
  };

  const handleCancel = () => {
    setShowValidation?.(false);
    setActiveTab?.("Save Search Form");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-10 ps-14">
      <div>
        {/* Include */}
        <div className="mb-6">
          <h3 className="font-semibold block font-inter text-p mb-4">Include</h3>
          <TagInput
            placeholder="Add keywords…"
            defaultTags={includeTags}
            onTagsChange={handleIncludeChange}
          />
        </div>

        {/* Exclude */}
        <div className="mb-6">
          <h3 className="font-semibold block font-inter text-p mb-4">Exclude</h3>
          <TagInput
            placeholder="Add keywords…"
            defaultTags={excludeTags}
            onTagsChange={handleExcludeChange}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
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

export default KeywordTab;