//                           import React, { useEffect, useState, useRef, useCallback } from "react";
// import AlertToggle from "../components/AlertToggle";
// import HeroHeading from "../components/HeroHeading";
// import BgCover from "../components/BgCover";
// import BidTable from "../components/BidTable";
// import api from "../utils/axios";
// import Pagination from "../components/Pagination";
// import FilterPanel from "../components/FilterPanel";
// import { useNavigate } from "react-router-dom";
// import FilterPanelSaveSearch from "../components/FilterPanelSaveSearch";

// function Dashboard() {
//   const data = { title: "Dashboard" };

//   const [filters, setFilters] = useState({
//     status: "Open Solicitations",
//     categories: [],
//     keyword: "",
//     location: "",
//     publishedDate: { from: "", to: "" },
//     closingDate: { from: "", to: "" },
//     solicitationType: [],
//     searchName: "",
//   });

//   const [searchText, setSearchText] = useState("");
//   const [bids, setBids] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [saveSearchToggle, setSaveSearchToggle] = useState(false);
//   const [savedSearches, setSavedSearches] = useState([]);
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   const [activeFilterTab, setActiveFilterTab] = useState(() => {
//     return localStorage.getItem("lastActiveFilterTab") || "Status";
//   });

//   const perPage = 25;
//   const bidsSectionRef = useRef(null);
//   const [count, setCount] = useState(0);
//   const navigate = useNavigate();

//   const middle = [
//     { id: 1, title: "Total Bids", num: totalResults },
//     { id: 2, title: "Active Bids", num: count },
//     { id: 3, title: "New Bids", num: count },
//     { id: 4, title: "Saved", num: "0" },
//     { id: 5, title: "Followed", num: "0/25" },
//   ];

//   const fetchSavedSearches = async () => {
//     const token = localStorage.getItem("access_token");
//     try {
//       const res = await api.get("/bids/saved-filters/", {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });
//       const saved = res.data.map((item) => item.name);
//       setSavedSearches(saved);
//     } catch (err) {
//       console.error("Failed to fetch saved searches", err);
//     }
//   };

//   const fetchBids = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       setError("User not logged in");
//       setBids([]);
//       setLoading(false);
//       navigate("/login");
//       return;
//     }

//     try {
//       const params = new URLSearchParams();
//       params.append("page", currentPage);
//       params.append("pageSize", perPage);

//       const statusMap = {
//         "Open Solicitations": "Active",
//         "Closed Solicitations": "Inactive",
//         "Awarded Solicitations": "Awarded",
//       };

//       const mappedStatus = statusMap[filters.status];
//       if (mappedStatus) params.append("bid_type", mappedStatus);
//       if (filters.keyword) params.append("bid_name", filters.keyword);
//       if (filters.location) {
//         const stateParam = filters.location
//           .split(",")
//           .map((name) => name.trim())
//           .join(",");
//         params.append("state", stateParam);
//       }

//       if (searchText.trim()) {
//         params.append("search", searchText.trim());
//       }

//       if (filters.publishedDate?.from && filters.publishedDate?.to) {
//         const fromDate = new Date(filters.publishedDate.from);
//         const toDate = new Date(filters.publishedDate.to);
//         if (fromDate <= toDate) {
//           params.append("open_date_after", filters.publishedDate.from);
//           params.append("open_date_before", filters.publishedDate.to);
//         }
//       }

//       if (filters.closingDate?.from && filters.closingDate?.to) {
//         const fromDate = new Date(filters.closingDate.from);
//         const toDate = new Date(filters.closingDate.to);
//         if (!isNaN(fromDate) && !isNaN(toDate) && fromDate <= toDate) {
//           params.append("close_date_after", filters.closingDate.from);
//           params.append("close_date_before", filters.closingDate.to);
//         }
//       }

//       if (Array.isArray(filters.solicitationType) && filters.solicitationType.length > 0) {
//         params.append("solicitation", filters.solicitationType.join(","));
//       }

//       const res = await api.get(`/bids/?${params.toString()}`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });
//       console.log(params.toString());
//       setCount(res.data.count);
//       const bidList = res.data.results || res.data;
//       setBids(bidList);
//       setTotalResults(res.data.count || bidList.length);
//     } catch (err) {
//       if (err.response?.data?.code === "token_not_valid") {
//         setError("Session expired. Please login again.");
//       } else {
//         setError("Failed to fetch bids");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, filters, searchText, navigate]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchBids();
//     }, 600);

//     return () => clearTimeout(delayDebounce);
//   }, [fetchBids]);

//   useEffect(() => {
//     fetchSavedSearches();
//   }, []);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     if (bidsSectionRef.current) {
//       bidsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   const handleOpenFilter = () => {
//     const lastTab = localStorage.getItem("lastActiveFilterTab") || "Status";
//     setActiveFilterTab(lastTab);
//     setSidebarToggle(true);
//   };

//   return (
//     <div className="bg-blue h-screen overflow-scroll">
//       {sidebarToggle && (
//         <FilterPanel
//           filters={filters}
//           setFilters={setFilters}
//           onClose={() => setSidebarToggle(false)}
//           activeTab={activeFilterTab}
//           setActiveTab={(tab) => {
//             setActiveFilterTab(tab);
//             localStorage.setItem("lastActiveFilterTab", tab);
//           }}
//         />
//       )}
//       {saveSearchToggle && (
//         <FilterPanelSaveSearch
//           filters={filters}
//           setFilters={setFilters}
//           onClose={() => setSaveSearchToggle((prev) => !prev)}
//           onSave={fetchSavedSearches}
//         />
//       )}

//       <div className="container-fixed py-10 px-4">
//         {/* Header */}
//         <div className="dashboard-header flex justify-between items-center">
//           <HeroHeading data={data} />
//           <div className="flex items-center gap-[15px]">
//             <span className="font-inter text-[#DBDBDB]">Alert</span>
//             <AlertToggle />
//             <div className="search-box bg-btn p-4 px-6 flex gap-3 items-center rounded-[30px]">
//               <i className="far text-white fa-search"></i>
//               <input
//                 type="text"
//                 placeholder="Search titles or organization or location"
//                 className="text-white bg-transparent w-[300px] border-none outline-none"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="dashboard-middle">
//           <div className="max-w-[1200px] py-[80px] flex justify-center mx-auto gap-8">
//             {middle.map((item) => (
//               <BgCover key={item.id}>
//                 <div className="flex gap-4">
//                   <div className="text font-inter text-[#DBDBDB]">{item.title}</div>
//                   <p className="num font-inter font-bold text-white">{item.num}</p>
//                 </div>
//               </BgCover>
//             ))}
//           </div>
//         </div>

//         {/* Top Right Controls */}
//         <div className="dashboard-feature">
//           <div className="flex justify-between">
//             <div className="feature-left">
//               <div
//                 className="bg-btn p-4 w-[56px] h-[56px] rounded-[16px] flex justify-center items-center cursor-pointer"
//                 onClick={handleOpenFilter}
//                 id="filter"
//               >
//                 <img
//                   src={sidebarToggle ? "close.png" : "filter.png"}
//                   className="w-6"
//                   alt="Filter Toggle"
//                 />
//               </div>
//             </div>

//             <div className="feature-right">
//               <div className="flex gap-4">
//                 <div className="bg-btn p-4 rounded-[16px]" id="export">
//                   <img src="export.png" className="w-6" alt="Export" />
//                 </div>
//                 <div className="saved-search bg-btn p-4 px-6 rounded-[30px] font-inter font-medium">
//                   <select className="bg-transparent text-white">
//                     <option className="text-black" disabled selected>
//                       My Saved Searches
//                     </option>
//                     {savedSearches.map((search, index) => (
//                       <option key={index} className="text-black" value={search}>
//                         {search}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <BgCover>
//                   <div
//                     className="text-white cursor-pointer"
//                     onClick={() => setSaveSearchToggle((prev) => !prev)}
//                   >
//                     Save Search
//                   </div>
//                 </BgCover>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table + Pagination */}
//         <div ref={bidsSectionRef}>
//           {loading ? (
//             <div className="text-white text-center py-10">Loading...</div>
//           ) : error ? (
//             <div className="text-red-400 text-center py-10">{error}</div>
//           ) : (
//             <BidTable bids={bids} />
//           )}

//           <Pagination
//             totalResults={totalResults}
//             perPage={perPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;





import React, { useEffect, useState, useRef, useCallback } from "react";
import AlertToggle from "../components/AlertToggle";
import HeroHeading from "../components/HeroHeading";
import BgCover from "../components/BgCover";
import BidTable from "../components/BidTable";
import api from "../utils/axios";
import Pagination from "../components/Pagination";
import FilterPanel from "../components/FilterPanel";
import FilterPanelSaveSearch from "../components/FilterPanelSaveSearch";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const data = { title: "Dashboard" };
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: "Open Solicitations",
    categories: [],
    keyword: "",
    location: "",
    publishedDate: { from: "", to: "" },
    closingDate: { from: "", to: "" },
    solicitationType: [],
  });

  const [searchText, setSearchText] = useState("");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [count, setCount] = useState(0);
  const [saveSearchToggle, setSaveSearchToggle] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState(() => {
    return localStorage.getItem("lastActiveFilterTab") || "Status";
  });

  const perPage = 25;
  const bidsSectionRef = useRef(null);

  const middle = [
    { id: 1, title: "Total Bids", num: totalResults },
    { id: 2, title: "Active Bids", num: count },
    { id: 3, title: "New Bids", num: count },
    { id: 4, title: "Saved", num: "0" },
    { id: 5, title: "Followed", num: "0/25" },
  ];

  const fetchSavedSearches = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await api.get("/bids/saved-filters/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log(res.data);
      const saved = res.data.map((item) => item.name);
      setSavedSearches(saved);
    } catch (err) {
      console.error("Failed to fetch saved searches", err);
    }
  };

 const postSaveSearch = async (data) => {
  const token = localStorage.getItem("access_token");

  // build query string
  const params = new URLSearchParams();
  params.append("page", currentPage);
  params.append("pageSize", perPage);

  const statusMap = {
    "Open Solicitations": "Active",
    "Closed Solicitations": "Inactive",
    "Awarded Solicitations": "Awarded",
  };

  const mappedStatus = statusMap[filters.status];
  if (mappedStatus) params.append("bid_type", mappedStatus);
  if (filters.keyword) params.append("bid_name", filters.keyword);
  if (filters.location) {
    const stateParam = filters.location.split(",").map((name) => name.trim()).join(",");
    params.append("state", stateParam);
  }

  if (filters.publishedDate?.from && filters.publishedDate?.to) {
    params.append("open_date_after", filters.publishedDate.from);
    params.append("open_date_before", filters.publishedDate.to);
  }

  if (filters.closingDate?.from && filters.closingDate?.to) {
    params.append("close_date_after", filters.closingDate.from);
    params.append("close_date_before", filters.closingDate.to);
  }

  if (Array.isArray(filters.solicitationType) && filters.solicitationType.length > 0) {
    params.append("solicitation", filters.solicitationType.join(","));
  }

  const queryString = `?${params.toString()}`;

  try {
    const body = {
      name: data.name,
      query_string: queryString,
      is_default: data.isDefault,
    };

    console.log("✅ Save Request Payload:", body);

    await api.post("/bids/saved-filters/", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchSavedSearches();
  } catch (err) {
    console.error("❌ Failed to save search", err);
  }
};


  const fetchBids = useCallback(async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("User not logged in");
      setBids([]);
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("pageSize", perPage);

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

      if (searchText.trim()) {
        params.append("search", searchText.trim());
      }

      if (filters.publishedDate?.from && filters.publishedDate?.to) {
        const fromDate = new Date(filters.publishedDate.from);
        const toDate = new Date(filters.publishedDate.to);
        if (fromDate <= toDate) {
          params.append("open_date_after", filters.publishedDate.from);
          params.append("open_date_before", filters.publishedDate.to);
        }
      }

      if (filters.closingDate?.from && filters.closingDate?.to) {
        const fromDate = new Date(filters.closingDate.from);
        const toDate = new Date(filters.closingDate.to);
        if (!isNaN(fromDate) && !isNaN(toDate) && fromDate <= toDate) {
          params.append("close_date_after", filters.closingDate.from);
          params.append("close_date_before", filters.closingDate.to);
        }
      }

      if (
        Array.isArray(filters.solicitationType) &&
        filters.solicitationType.length > 0
      ) {
        params.append("solicitation", filters.solicitationType.join(","));
      }

      const res = await api.get(`/bids/?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      console.log(params.toString());
      setCount(res.data.count);
      const bidList = res.data.results || res.data;
      setBids(bidList);
      setTotalResults(res.data.count || bidList.length);
    } catch (err) {
      if (err.response?.data?.code === "token_not_valid") {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch bids");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, searchText, navigate]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBids();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [fetchBids]);

  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (bidsSectionRef.current) {
      bidsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenFilter = () => {
    const lastTab = localStorage.getItem("lastActiveFilterTab") || "Status";
    setActiveFilterTab(lastTab);
    setSidebarToggle(true);
  };

  return (
    <div className="bg-blue h-screen overflow-scroll">
      {sidebarToggle && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClose={() => setSidebarToggle(false)}
          activeTab={activeFilterTab}
          setActiveTab={(tab) => {
            setActiveFilterTab(tab);
            localStorage.setItem("lastActiveFilterTab", tab);
          }}
        />
      )}

      {saveSearchToggle && (
        <FilterPanelSaveSearch
          filters={filters}
          setFilters={setFilters}
          onClose={() => setSaveSearchToggle(false)}
          onSave={postSaveSearch}
        />
      )}

      <div className="container-fixed py-10 px-4">
        <div className="dashboard-header flex justify-between items-center">
          <HeroHeading data={data} />
          <div className="flex items-center gap-[15px]">
            <span className="font-inter text-[#DBDBDB]">Alert</span>
            <AlertToggle />
            <div className="search-box bg-btn p-4 px-6 flex gap-3 items-center rounded-[30px]">
              <i className="far text-white fa-search"></i>
              <input
                type="text"
                placeholder="Search titles or organization or location"
                className="text-white bg-transparent w-[300px] border-none outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="max-w-[1200px] py-[80px] flex justify-center mx-auto gap-8">
            {middle.map((item) => (
              <BgCover key={item.id}>
                <div className="flex gap-4">
                  <div className="text font-inter text-[#DBDBDB]">{item.title}</div>
                  <p className="num font-inter font-bold text-white">{item.num}</p>
                </div>
              </BgCover>
            ))}
          </div>
        </div>

        <div className="dashboard-feature">
          <div className="flex justify-between">
            <div className="feature-left">
              <div
                className="bg-btn p-4 w-[56px] h-[56px] rounded-[16px] flex justify-center items-center cursor-pointer"
                onClick={handleOpenFilter}
                id="filter"
              >
                <img
                  src={sidebarToggle ? "close.png" : "filter.png"}
                  className="w-6"
                  alt="Filter Toggle"
                />
              </div>
            </div>

            <div className="feature-right">
              <div className="flex gap-4">
                <div className="bg-btn p-4 rounded-[16px]" id="export">
                  <img src="export.png" className="w-6" alt="Export" />
                </div>
                <div className="saved-search bg-btn p-4 px-6 rounded-[30px] font-inter font-medium">
                  <select className="bg-transparent text-white">
                    <option className="text-black" disabled selected>
                      My Saved Searches
                    </option>
                    {savedSearches.map((search, index) => (
                      <option key={index} className="text-black" value={search}>
                        {search}
                      </option>
                    ))}
                  </select>
                </div>
                <BgCover>
                  <div
                    className="text-white cursor-pointer"
                    onClick={() => setSaveSearchToggle(true)}
                  >
                    Save Search
                  </div>
                </BgCover>
              </div>
            </div>

          </div>
        </div>

        <div ref={bidsSectionRef}>
          {loading ? (
            <div className="text-white text-center py-10">Loading...</div>
          ) : error ? (
            <div className="text-red-400 text-center py-10">{error}</div>
          ) : (
            <BidTable bids={bids} />
          )}

          <Pagination
            totalResults={totalResults}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
