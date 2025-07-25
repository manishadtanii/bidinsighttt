import React from 'react';

function StatusTab() {

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-10 ps-14">
      <div>
        <div className="space-y-6">
          {/* Solicitations Radio Group */}
          <div>
            <h2 className="text-p font-inter font-bold mb-2">Solicitations</h2>
            <div className="space-y-3">
              {["Open Solicitations", "Closed Solicitations"].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="solicitation"
                    value={option}
                    className="accent-purple-600"
                  />
                  <span className="font-inter text-xl">{option}</span>
                </label>
              ))}
            </div>
          </div>

       
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4 pt-10">
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

export default StatusTab;