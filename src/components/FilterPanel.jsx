import React, { useState } from "react";

import StatusTab from './tabs/StatusTab';
import CategoriesTab from './tabs/CategoriesTab';
import KeywordTab from './tabs/KeywordTab';
import LocationTab from './tabs/LocationTab';
import PublishedDateTab from './tabs/PublishedDateTab';
import ClosingDateTab from './tabs/ClosingDateTab';
import SolicitationTypeTab from './tabs/SolicitationTypeTab';
import UNSPSCCode from "./tabs/UNSPSCCode";
import NAICSCode from "./tabs/NAICSCode";

const tabs = [
  "Status",
  "Keyword",
  "Location",
  "NAICS Code",
  "UNSPSC Code",
  // "Include Keywords",
  // "Exclude Keywords",
  "Published Date",
  "Closing Date",
  "Solicitation Type",
];

const FilterPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Status":
        return <StatusTab />;
      case "NAICS Code":
        return <NAICSCode />;
      case "UNSPSC Code":
        return <UNSPSCCode />;
      case "Keyword":
        return <KeywordTab mode="keyword" />;
      case "Include Keywords":
        return <KeywordTab mode="include" />;
      case "Exclude Keywords":
        return <KeywordTab mode="exclude" />;
      case "Location":
        return <LocationTab />;
      case "Published Date":
        return <PublishedDateTab />;
      case "Closing Date":
        return <ClosingDateTab />;
      case "Solicitation Type":
        return <SolicitationTypeTab />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[500] flex">
      {/* Sidebar */}
      <div className="w-[30%] bg-blue text-white p-10 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-end mb-8">
            <h1 className="font-archivo font-bold text-h3">Filter</h1>
            <button className="text-p font-inter" onClick={onClose}>Close ✕</button>
          </div>

          <ul className="space-y-4">
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pt-2 ${activeTab === tab ? "font-bold" : ""}`}
              >
                <div className="flex justify-between items-center font-inter text-p font-medium">
                  <span>{tab}</span>
                  <span>{activeTab === tab ? "−" : "+"}</span>
                </div>
                <img src="line.png" className="mt-3" alt="divider" />
              </li>
            ))}
          </ul>
        </div>

        <button className="text-p underline font-inter text-right">Clear All</button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white flex flex-col justify-between w-[70%]">
        <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default FilterPanel;
