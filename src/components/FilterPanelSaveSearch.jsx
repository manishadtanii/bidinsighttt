// // import React, { useState } from "react";
// // import SaveSearchForm from "./tabs/SaveSearchForm";
// // import StatusTab from "./tabs/StatusTab";
// // import CategoriesTab from "./tabs/CategoriesTab";
// // import KeywordTab from "./tabs/KeywordTab";
// // import LocationTab from "./tabs/LocationTab";
// // import PublishedDateTab from "./tabs/PublishedDateTab";
// // import ClosingDateTab from "./tabs/ClosingDateTab";
// // import SolicitationTypeTab from "./tabs/SolicitationTypeTab";

// // // Dummy components for tabs — replace with your real ones
// // // const StatusTab = () => <div className="p-6">Status Content</div>;
// // // const CategoriesTab = () => <div className="p-6">Categories Content</div>;
// // // const KeywordTab = () => <div className="p-6">Keyword Content</div>;
// // // const LocationTab = () => <div className="p-6">Location Content</div>;
// // // const PublishedDateTab = () => (
// // //   <div className="p-6">Published Date Content</div>
// // // );
// // // const ClosingDateTab = () => <div className="p-6">Closing Date Content</div>;
// // // const SolicitationTypeTab = () => (
// // //   <div className="p-6">Solicitation Type Content</div>
// // // );

// // const tabs = [
// //   "Save Search Form",
// //   "Status",
// //   "Categories",
// //   "Keyword",
// //   "Location",
// //   "Published Date",
// //   "Closing Date",
// //   "Solicitation Type",
// // ];

// // function FilterPanelSaveSearch({ onClose }) {
// //   const [activeTab, setActiveTab] = useState("SaveSearchForm");

// //   const renderTabContent = () => {
// //     switch (activeTab) {
// //       case "SaveSearchForm":
// //         return <SaveSearchForm />;
// //       case "Status":
// //         return <StatusTab />;
// //       case "Categories":
// //         return <CategoriesTab />;
// //       case "Keyword":
// //         return <KeywordTab />;
// //       case "Location":
// //         return <LocationTab />;
// //       case "Published Date":
// //         return <PublishedDateTab />;
// //       case "Closing Date":
// //         return <ClosingDateTab />;
// //       case "Solicitation Type":
// //         return <SolicitationTypeTab />;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="absolute top-0 left-0 w-full h-screen z-50 flex">
// //       {/* Sidebar */}
// //       <div className="w-[30%] bg-blue text-white p-10 flex flex-col justify-between">
// //         <div>
// //           <div className="flex justify-between items-end mb-8">
// //             <h1 className="font-archivo font-bold text-h3">Filter</h1>
// //             <button onClick={onClose} className="text-p font-inter ">
// //               Close ✕
// //             </button>
// //           </div>
// //           <ul className="space-y-4">
// //             {tabs.map((tab) => (
// //               <li
// //                 key={tab}
// //                 className="cursor-pointer pt-2"
// //                 onClick={() => setActiveTab(tab)}
// //               >
// //                 <div className="flex justify-between items-center font-inter text-p font-medium">
// //                   <span>{tab}</span>
// //                   <span>{activeTab === tab ? "−" : "+"}</span>
// //                 </div>
// //                 <img src="line.png" className="mt-3" alt="" />
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //         <button
// //           onClick={() => setActiveTab(null)}
// //           className="text-p underline font-inter text-right"
// //         >
// //           Clear All
// //         </button>
// //       </div>

// //       {/* Main content area */}
// //       <div className="flex-1 bg-white flex flex-col justify-between w-[70%]">
// //         <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default FilterPanelSaveSearch;






// import React, { useState } from "react";
// import SaveSearchForm from "./tabs/SavedSearchForm";
// import StatusTab from "./tabs/StatusTab";
// import CategoriesTab from "./tabs/CategoriesTab";
// import KeywordTab from "./tabs/KeywordTab";
// import LocationTab from "./tabs/LocationTab";
// import PublishedDateTab from "./tabs/PublishedDateTab";
// import ClosingDateTab from "./tabs/ClosingDateTab";
// import SolicitationTypeTab from "./tabs/SolicitationTypeTab";

// const tabs = [
//   "SaveSearchForm",
//   "Status",
//   "Categories",
//   "Keyword",
//   "Location",
//   "Published Date",
//   "Closing Date",
//   "Solicitation Type",
// ];

// function FilterPanelSaveSearch({ filters, setFilters, onClose, onSave }) {
//   const [activeTab, setActiveTab] = useState("SaveSearchForm");

//   const handleSaveSearchSubmit = (data) => {
//     console.log("✅ Final Save Search Data:", data);

//     if (data.action === "create" && data.name?.trim()) {
//       onSave?.(data.name.trim()); // ✅ Add to dropdown list in Dashboard
//     }

//     onClose();
//   };

//   const tabProps = { filters, setFilters };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "SaveSearchForm":
//         return (
//           <SaveSearchForm
//             {...tabProps}
//             onCancel={onClose}
//             onSubmit={handleSaveSearchSubmit}
//             onSave={onSave} // ✅ Forward this
//           />
//         );
//       case "Status":
//         return <StatusTab {...tabProps} />;
//       case "Categories":
//         return <CategoriesTab {...tabProps} />;
//       case "Keyword":
//         return <KeywordTab {...tabProps} />;
//       case "Location":
//         return <LocationTab {...tabProps} />;
//       case "Published Date":
//         return <PublishedDateTab {...tabProps} />;
//       case "Closing Date":
//         return <ClosingDateTab {...tabProps} />;
//       case "Solicitation Type":
//         return <SolicitationTypeTab {...tabProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="absolute top-0 left-0 w-full h-screen z-50 flex">
//       {/* Sidebar */}
//       <div className="w-[30%] bg-blue text-white p-10 flex flex-col justify-between">
//         <div>
//           <div className="flex justify-between items-end mb-8">
//             <h1 className="font-archivo font-bold text-h3">Filter</h1>
//             <button onClick={onClose} className="text-p font-inter">
//               Close ✕
//             </button>
//           </div>
//           <ul className="space-y-4">
//             {tabs.map((tab) => (
//               <li
//                 key={tab}
//                 className="cursor-pointer pt-2"
//                 onClick={() => setActiveTab(tab)}
//               >
//                 <div className="flex justify-between items-center font-inter text-p font-medium">
//                   <span>{tab}</span>
//                   <span>{activeTab === tab ? "−" : "+"}</span>
//                 </div>
//                 <img src="line.png" className="mt-3" alt="" />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <button
//           onClick={() => {
//             setFilters({
//               status: "",
//               categories: [],
//               keyword: "",
//               location: "",
//               publishedDate: { from: "", to: "" },
//               closingDate: { from: "", to: "" },
//               solicitationType: [],
//               searchName: "",
//               searchOption: "replace",
//             });
//             setActiveTab("SaveSearchForm");
//           }}
//           className="text-p underline font-inter text-right"
//         >
//           Clear All
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 bg-white flex flex-col justify-between w-[70%]">
//         <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
//       </div>
//     </div>
//   );
// }

// export default FilterPanelSaveSearch;

import React, { useState, useEffect } from "react";
import SaveSearchForm from "./tabs/SavedSearchForm";
import StatusTab from "./tabs/StatusTab";
import CategoriesTab from "./tabs/CategoriesTab";
import KeywordTab from "./tabs/KeywordTab";
import LocationTab from "./tabs/LocationTab";
import PublishedDateTab from "./tabs/PublishedDateTab";
import ClosingDateTab from "./tabs/ClosingDateTab";
import SolicitationTypeTab from "./tabs/SolicitationTypeTab";

const tabs = [
  "Save Search Form",
  "Status",
  "Categories",
  "Keyword",
  "Location",
  "Published Date",
  "Closing Date",
  "Solicitation Type",
];

function FilterPanelSaveSearch({
  filters: saveSearchFilters,
  setFilters: setSaveSearchFilters,
  onClose,
  onSave,
  selectedSearch = "",
  mode = "create", // "create" or "replace"
}) {
  const [activeTab, setActiveTab] = useState("Save Search Form");
  const [defaultSearch, setDefaultSearch] = useState(false);
  const [searchOption, setSearchOption] = useState("create");
  const [selectedSavedSearch, setSelectedSavedSearch] = useState("");


  // Autofill searchName if in replace mode
  useEffect(() => {
    if (mode === "replace" && selectedSearch) {
      setSaveSearchFilters((prev) => ({
        ...prev,
        searchName: selectedSearch,
      }));
    }
  }, [mode, selectedSearch, setSaveSearchFilters]);

  const buildQueryString = (filters) => {
    const params = new URLSearchParams();

    const statusMap = {
      "Open Solicitations": "Active",
      "Closed Solicitations": "Inactive",
      "Awarded Solicitations": "Awarded",
    };

    const mappedStatus = statusMap[filters.status];
    if (mappedStatus) params.append("bid_type", mappedStatus);
    if (filters.keyword) params.append("bid_name", filters.keyword);

    if (filters.location) {
      const stateParam = filters.location
        .split(",")
        .map((name) => name.trim())
        .join(",");
      params.append("state", stateParam);
    }

    if (filters.categories?.length)
      params.append("categories", filters.categories.join(","));

    if (filters.solicitationType?.length)
      params.append("solicitation", filters.solicitationType.join(","));

    const { from: pubFrom, to: pubTo } = filters.publishedDate || {};
    if (pubFrom) params.append("open_date_after", pubFrom);
    if (pubTo) params.append("open_date_before", pubTo);

    const { from: closeFrom, to: closeTo } = filters.closingDate || {};
    if (closeFrom) params.append("close_date_after", closeFrom);
    if (closeTo) params.append("close_date_before", closeTo);

    return `?${params.toString()}`;
  };

  const handleSaveSearchSubmit = (data) => {
    if (!data.name?.trim()) return;

    const queryString = buildQueryString(saveSearchFilters);
    onSave?.({
      name: data.name.trim(),
      isDefault: defaultSearch,
      filters: saveSearchFilters,
      query_string: queryString,
    });

    onClose();
  };

  const handleClearAll = () => {
    setSaveSearchFilters({
      searchName: "",
      status: "",
      categories: [],
      keyword: "",
      location: "",
      publishedDate: { from: "", to: "" },
      closingDate: { from: "", to: "" },
      solicitationType: [],
    });
    setActiveTab("Save Search Form");
  };

  const tabProps = {
    filters: saveSearchFilters,
    setFilters: setSaveSearchFilters,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Save Search Form":
        return (
          <SaveSearchForm
            {...tabProps}
            onCancel={onClose}
            onSubmit={handleSaveSearchSubmit}
            defaultSearch={defaultSearch}
            setDefaultSearch={setDefaultSearch}
            searchOption={searchOption}
            setSearchOption={setSearchOption}
            selectedSavedSearch={selectedSavedSearch}
            setSelectedSavedSearch={setSelectedSavedSearch}
          />

        );
      case "Status":
        return <StatusTab {...tabProps} />;
      case "Categories":
        return <CategoriesTab {...tabProps} />;
      case "Keyword":
        return <KeywordTab {...tabProps} />;
      case "Location":
        return <LocationTab {...tabProps} />;
      case "Published Date":
        return <PublishedDateTab {...tabProps} />;
      case "Closing Date":
        return <ClosingDateTab {...tabProps} />;
      case "Solicitation Type":
        return <SolicitationTypeTab {...tabProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-50 flex">
      {/* Sidebar */}
      <div className="w-[30%] bg-blue text-white p-10 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-end mb-8">
            <h1 className="font-archivo font-bold text-h3">Save Search</h1>
            <button onClick={onClose} className="text-p font-inter">
              Close ✕
            </button>
          </div>

          <ul className="space-y-4">
            {tabs.map((tab) => (
              <li
                key={tab}
                className="cursor-pointer pt-2"
                onClick={() => setActiveTab(tab)}
              >
                <div className="flex justify-between items-center font-inter text-p font-medium">
                  <span>{tab}</span>
                  <span>{activeTab === tab ? "−" : "+"}</span>
                </div>
                <img src="line.png" className="mt-3" alt="" />
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleClearAll}
          className="text-p underline font-inter text-right"
        >
          Clear All
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col justify-between w-[70%]">
        <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default FilterPanelSaveSearch;




