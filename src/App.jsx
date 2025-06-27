import React, { useState } from "react";
import {
  faFilter,
  faDownload,
  faShareAlt,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@headlessui/react";

const initialBids = [
  {
    govLevel: "TN",
    bidName: "Canvas Learning Management Tool (LMS)",
    openDate: "Jun, 25",
    closedDate: "Jul, 25",
    status: "Active",
    saved: true,
    followed: true,
  },
  {
    govLevel: "CA",
    bidName: "Statewide Broadband Expansion",
    openDate: "Jun, 20",
    closedDate: "Jul, 10",
    status: "Active",
    saved: false,
    followed: false,
  },
];

const getTabData = (bids) => [
  { label: "Active Bids", count: bids.filter((b) => b.status === "Active").length },
  { label: "New Bids", count: bids.length },
  { label: "Saved", count: `${bids.filter((b) => b.saved).length}/25` },
  { label: "Followed", count: `${bids.filter((b) => b.followed).length}/25` },
];

const Dashboard = () => {
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [search, setSearch] = useState("");
  const [bids, setBids] = useState(initialBids);

  const tabData = getTabData(bids);

  const filteredBids = bids.filter((bid) =>
    bid.bidName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-[#0C0C34] to-[#1B1B50] min-h-screen text-white px-4 md:px-8 py-10">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        {tabData.map(({ label, count }, i) => (
          <div
            key={i}
            className="bg-white/10 px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition cursor-pointer"
          >
            {label} <span className="font-bold ml-1">{count}</span>
          </div>
        ))}

        <div className="ml-auto flex items-center space-x-2 text-sm">
          <span>Alert</span>
          <Switch
            checked={alertEnabled}
            onChange={setAlertEnabled}
            className={`${
              alertEnabled ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                alertEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition">
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition">
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search titles or organization or location"
          className="flex-1 min-w-[200px] lg:min-w-[400px] px-4 py-2 rounded-full bg-white/10 placeholder-white/70 focus:outline-none border border-white/20"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-white/10 text-white uppercase">
              <th className="px-4 py-3">Gov. Level</th>
              <th className="px-4 py-3">Bid Name</th>
              <th className="px-4 py-3">Open Date</th>
              <th className="px-4 py-3">Closed Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Share</th>
              <th className="px-4 py-3">Save</th>
            </tr>
          </thead>
          <tbody>
            {filteredBids.length > 0 ? (
              filteredBids.map((bid, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-4">{bid.govLevel}</td>
                  <td className="px-4 py-4">{bid.bidName}</td>
                  <td className="px-4 py-4">{bid.openDate}</td>
                  <td className="px-4 py-4">{bid.closedDate}</td>
                  <td className="px-4 py-4">
                    <span className="bg-green-500 text-xs px-3 py-1 rounded-full inline-block">
                      ● {bid.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <FontAwesomeIcon
                      icon={faShareAlt}
                      className="text-white hover:text-blue-300 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <FontAwesomeIcon
                      icon={bid.saved ? solidBookmark : regularBookmark}
                      className={`${
                        bid.saved ? "text-yellow-400" : "text-white"
                      } hover:text-yellow-400 cursor-pointer`}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center" colSpan={7}>
                  No bids match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
