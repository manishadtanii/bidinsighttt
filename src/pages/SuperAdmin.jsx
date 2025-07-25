import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faDatabase, faCog, faSignOutAlt, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import URLBar from "../sections/super-admin/URLBar";
// import TargetChart from "../sections/super-admin/Target";

export default function SuperAdmin() {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="bg-blue sticky top-0 text-white w-64 p-6 flex flex-col justify-between h-screen">
        <div>
          <h1 className="text-2xl font-bold mb-10">BidInsight</h1>
          <nav className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-lg">
              <FontAwesomeIcon icon={faLink} /> <span>URL Scrapping</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <FontAwesomeIcon icon={faDatabase} /> <span>CMS</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <FontAwesomeIcon icon={faCog} /> <span>Settings</span>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-lg cursor-pointer">
          <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1  space-y-8 overflow-x-hidden">
        {/* Top Nav */}
        <div className="flex flex-wrap justify-between py-4 px-8 border-b-2 border-primary items-center gap-4">
          <h2 className="text-2xl font-semibold">URL Scrapping</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search titles or organization or location"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full outline-none"
              />
            </div>
            {/* <FontAwesomeIcon icon={faBell} className="text-blue-600 text-xl" /> */}
            <div className="relative w-12 h-12 rounded-full border border-blue-600 flex items-center justify-center">
              <FontAwesomeIcon icon={faBell} className="text-blue-600 text-lg" />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
              Hi, Angela
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4 px-8">
          {[
            { label: "Total Bids", value: "15,000", change: "+10%", color: "text-green-600", note: "Growth since last month" },
            { label: "Scrapped Bids", value: "13,000", change: "+10%", color: "text-green-600", note: "Growth since last month" },
            { label: "Accepted Bids", value: "12,000", change: "-10%", color: "text-red-600", note: "Down from last month" },
            { label: "Error Bids", value: "1,000", change: "+10%", color: "text-green-600", note: "Growth since last month" },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border-2 border-primary shadow-sm">
              <h4 className="text-gray-700 font-medium mb-1">{card.label}</h4>
              <div className="text-2xl font-bold">{card.value} <span className={`${card.color} text-base`}>{card.change}</span></div>
              <p className="text-gray-500 mt-1 text-sm">{card.note}</p>
            </div>
          ))}
        </div>

        {/* Target Charts + Error Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Donut Charts */}
          <div className="col-span-1 xl:col-span-2 bg-white border rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Target</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-[10px] border-blue-300 border-t-blue-700 flex items-center justify-center text-lg font-bold">
                    10K/15K
                  </div>
                  <ul className="text-sm mt-2 text-center">
                    <li>Target URL: 15K</li>
                    <li>Active URL: 10K</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Error Table */}
          <div className="bg-white border rounded-2xl overflow-hidden">
            <div className="bg-blue-600 text-white font-semibold text-sm p-3 grid grid-cols-5">
              <span>ID</span>
              <span>Bid Name</span>
              <span>Error</span>
              <span>Time Stamp</span>
              <span>Action</span>
            </div>
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className={`grid grid-cols-5 items-center text-sm px-3 py-2 ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <span>ID-37</span>
                <span>ACOUSTICAL TILE...</span>
                <span className="text-red-600">504 Gateway Timeout</span>
                <span>10:56:45</span>
                <span className="text-xl text-center">⋮</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrapped Bids Table */}
        <div className="bg-white border rounded-2xl overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="bg-blue-600 text-white font-semibold text-sm p-3 grid grid-cols-6">
              <span>ID</span>
              <span>URL</span>
              <span>Bid Name</span>
              <span>Type</span>
              <span>Last 24H</span>
              <span>Override</span>
            </div>
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className={`grid grid-cols-6 items-center text-sm px-3 py-2 ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <span>ID-37</span>
                <span className="truncate">https://www.bidnetdirect.com/private/sup...</span>
                <span>ADDRESSING, COPYING...</span>
                <span>Federal</span>
                <span>10:56:45</span>
                <span>
                  <span className={`text-white text-xs px-3 py-1 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    {i % 2 === 0 ? "Automated" : "Manual"}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <URLBar />
        {/* <TargetChart /> */}
      </main>
    </div>
  );
}
