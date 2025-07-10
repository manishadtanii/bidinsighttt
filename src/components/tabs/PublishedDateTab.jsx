import { Search } from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";

const PublishedDateTab = ({ filters, setFilters, onApply }) => {
  const [selectedFilter, setSelectedFilter] = useState("lastLogin");
  const [date, setDate] = useState("");
  const [within, setWithin] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");



useEffect(() => {
  const { from, to } = filters.publishedDate || {};

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const today = new Date();
    const past7 = new Date(today);
    const past30 = new Date(today);
    const past90 = new Date(today);

    past7.setDate(today.getDate() - 7);
    past30.setDate(today.getDate() - 30);
    past90.setDate(today.getDate() - 90);

    // ✅ Single date filter
    if (from === to) {
      setSelectedFilter("date");
      setDate(from);
    }
    // ✅ Last X days
    else if (
      from === past7.toISOString().slice(0, 10) &&
      to === today.toISOString().slice(0, 10)
    ) {
      setSelectedFilter("within");
      setWithin("7");
    } else if (
      from === past30.toISOString().slice(0, 10) &&
      to === today.toISOString().slice(0, 10)
    ) {
      setSelectedFilter("within");
      setWithin("30");
    } else if (
      from === past90.toISOString().slice(0, 10) &&
      to === today.toISOString().slice(0, 10)
    ) {
      setSelectedFilter("within");
      setWithin("90");
    }
    // ✅ Custom timeline
    else {
      setSelectedFilter("timeline");
      setStart(from);
      setEnd(to);
    }
  }
}, [filters.publishedDate]);


  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-10 ps-14">
      <div className="flex flex-col gap-6">
        {/* Search bar */}
        {/* <div className="flex justify-end mb-8">
          <div className="relative w-[340px]">
            <input
              type="text"
              placeholder="Search titles or organization or location"
              className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
          </div>
        </div> */}

        {/* Last Login */}
        <div>
          <label className="font-semibold block font-inter text-p mb-2">Last Login</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="filter"
              value="lastLogin"
              checked={selectedFilter === "lastLogin"}
              onChange={() => setSelectedFilter("lastLogin")}
              className="accent-purple-600"
            />
            <span className="text-[22px] font-inter">07/07/2025</span>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="font-semibold block font-inter text-p mb-2">Date</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="filter"
              value="date"
              checked={selectedFilter === "date"}
              onChange={() => setSelectedFilter("date")}
              className="accent-purple-600"
            />
            <input
              type="date"
              disabled={selectedFilter !== "date"}
              className="border border-gray-300 rounded-md px-2 py-1 font-inter text-xl w-[200px]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Within */}
        <div>
          <label className="font-semibold block font-inter text-p mb-2">Within</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="filter"
              value="within"
              checked={selectedFilter === "within"}
              onChange={() => setSelectedFilter("within")}
              className="accent-purple-600"
            />
            <select
              disabled={selectedFilter !== "within"}
              className="border border-gray-300 rounded-md font-inter text-xl px-2 py-1 w-[200px]"
              value={within}
              onChange={(e) => setWithin(e.target.value)}
            >
              <option value="">-Select-</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="font-semibold block font-inter text-p mb-2">Timeline</label>
          <div className="flex items-start space-x-2 mb-1">
            <input
              type="radio"
              name="filter"
              value="timeline"
              checked={selectedFilter === "timeline"}
              onChange={() => setSelectedFilter("timeline")}
              className="accent-purple-600"
            />
            <div>
              <div className="font-inter text-xl text-gray-800 mb-2">Starting</div>
              <input
                type="date"
                disabled={selectedFilter !== "timeline"}
                className="border font-inter text-xl border-gray-300 rounded-md px-2 py-1 w-[200px]"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-6">
            <div className="font-inter text-xl text-gray-800 mb-2">Ending</div>
            <input
              type="date"
              disabled={selectedFilter !== "timeline"}
              className="border border-gray-300 rounded-md px-2 py-1 font-inter text-xl w-[200px]"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setSelectedFilter("");
            setDate("");
            setWithin("");
            setStart("");
            setEnd("");
            setFilters(prev => ({
              ...prev,
              publishedDate: { from: "", to: "" }
            }));
          }}
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            let from = "";
            let to = "";

            if (selectedFilter === "date" && date) {
              from = date;
              to = date;
            } else if (selectedFilter === "within") {
              const today = new Date();
              const pastDate = new Date(today);
              pastDate.setDate(today.getDate() - parseInt(within));
              from = pastDate.toISOString().slice(0, 10);
              to = today.toISOString().slice(0, 10);
            } else if (selectedFilter === "timeline" && start && end) {
              from = start;
              to = end;
            }

            setFilters(prev => ({
              ...prev,
              publishedDate: { from, to }
            }));

            // ✅ Close the filter panel to trigger useEffect in Dashboard
            onApply(); // 🔁 instead of navigate
          }}
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};


export default PublishedDateTab;
