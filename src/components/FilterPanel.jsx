import React, { useState } from "react";
import { motion } from "framer-motion";

const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPanels = () => setIsOpen(true);
  const closePanels = () => setIsOpen(false);

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      {/* Toggle Button */}
      <button
        className="m-4 px-4 py-2 rounded-full bg-blue-600 text-white"
        onClick={openPanels}
      >
        Open Filter
      </button>

      {/* Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10"
          onClick={closePanels}
        ></div>
      )}

      {/* Filter Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="fixed top-0 left-0 h-full w-[300px] bg-gradient-to-b from-[#1a1f6e] to-[#2b2f80] text-white z-20 p-6 shadow-lg rounded-r-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filter</h2>
          <button className="text-xl" onClick={closePanels}>
            ×
          </button>
        </div>

        {/* Filter Options */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Status</h3>
            <div className="text-sm space-y-1">
              <label className="block">
                <input type="checkbox" className="mr-2" />
                Open Solicitations
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" />
                Closed Solicitations
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" />
                Awarded Solicitations
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Personalised</h3>
            <label className="block text-sm">
              <input type="checkbox" className="mr-2" />
              My Invitations Only
            </label>
          </div>

          {/* Expandable Sections */}
          {["NIGP Categories", "Organization", "Location", "Published Date", "Closing Date", "Solicitation Type", "General Requirements", "Keywords"].map(
            (item) => (
              <div
                key={item}
                className="border-t border-white/30 pt-3 cursor-pointer flex justify-between items-center"
              >
                <span>{item}</span>
                <span className="text-xl">+</span>
              </div>
            )
          )}
        </div>

        <button className="mt-6 text-sm underline">Clear All</button>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 300 : "100%" }} // 300px offset for sidebar
        transition={{ type: "spring", delay: 0.2 }}
        className="fixed top-0 left-[300px] right-0 h-full bg-white z-10 px-6 py-10"
      >
        {/* Search Input and Button */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex border border-blue-400 rounded-full px-4 py-2 w-[60%] items-center">
            <i className="fas fa-search text-blue-600 mr-2"></i>
            <input
              type="text"
              placeholder="Search titles or organization or location"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full">
            Save Search
          </button>
        </div>

        {/* Duplicate Solicitations Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Solicitations</h3>
          <div className="text-sm space-y-2">
            <label className="block">
              <input type="checkbox" checked readOnly className="mr-2" />
              Open Solicitations
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Closed Solicitations
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Awarded Solicitations
            </label>
          </div>

          <h3 className="font-semibold text-lg mt-6 mb-2">Personalised</h3>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" />
            My Invitations Only
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex mt-10 gap-4">
          <button className="border border-black px-6 py-2 rounded-full">Cancel</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Search</button>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterPanel;
