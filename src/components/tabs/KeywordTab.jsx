import React, { useEffect, useState } from 'react';
import TagInput from './TagInput';

function KeywordTab() {
  

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-10 ps-14">
      <div>
        {/* Include */}
        <div className="mb-6">
          <h3 className="font-semibold block font-inter text-p mb-4">Include</h3>
          <TagInput
            placeholder="Add Keywords"
            defaultTags={["keyword1", "keyword2"]}
            onTagsChange={() => {}}
          />
        </div>

        {/* Exclude */}
        <div className="mb-6">
          <h3 className="font-semibold block font-inter text-p mb-4">Exclude</h3>
          <TagInput
            placeholder="Add Keywords"
            defaultTags={["exclude1", "exclude2"]}
            onTagsChange={() => {}}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>
        <button
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default KeywordTab;
