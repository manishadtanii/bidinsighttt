import React, { useEffect, useState, useRef, useCallback, use } from "react";
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
  const tableRef = useRef();

  const [filters, setFilters] = useState({
    status: "Open Solicitations",
    categories: [],
    keyword: "",
    location: "",
    publishedDate: { from: "", to: "" },
    closingDate: { from: "", to: "" },
    solicitationType: [],
    naics_codes: [],
    unspsc_codes: [],
    includeKeywords: [],
    excludeKeywords: [],
  });

  const [saveSearchFilters, setSaveSearchFilters] = useState({
    searchName: "",
    status: "",
    categories: [],
    keyword: "",
    location: "",
    publishedDate: { from: "", to: "" },
    closingDate: { from: "", to: "" },
    solicitationType: [],
    naics_codes: [],
    unspsc_codes: [],
    includeKeywords: [],
    excludeKeywords: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: "Open Solicitations",
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
  const [activeFilterTab, setActiveFilterTab] = useState(() => localStorage.getItem("lastActiveFilterTab") || "Status");
  const [selectedSavedSearch, setSelectedSavedSearch] = useState("");
  const [searchOption, setSearchOption] = useState("create");

  const perPage = 25;
  const bidsSectionRef = useRef(null);

  const middle = [
    { id: 1, title: "Total Bids", num: totalResults },
    { id: 2, title: "Active Bids", num: count },
    { id: 3, title: "New Bids", num: count },
    { id: 4, title: "Saved", num: "0" },
    { id: 5, title: "Followed", num: "0/25" },
  ];

  const handleExport = () => {
    if (tableRef.current) {
      tableRef.current.exportToCSV(); // call child method
    }
  };

  // list karraha hai only
  const fetchSavedSearches = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await api.get("/bids/saved-filters/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const saved = res.data.map((item) => item.name);
      // console.log(saved[0])
      setSavedSearches(saved);
    } catch (err) {
      console.error("Failed to fetch saved searches", err);
    }
  };

  const handleSavedSearchSelect = async (searchName) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await api.get("/bids/saved-filters/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const matched = res.data.find((item) => item.name === searchName);

      if (matched) {
        const urlParams = new URLSearchParams(matched.query_string);
        const filtersToUse = Object.fromEntries(urlParams.entries());

        // ✅ Step 1: Convert flat query to your filter format
        const finalFilters = {
          status: filtersToUse?.bid_type || "Open Solicitations",
          keyword: filtersToUse?.bid_name || "",
          location: filtersToUse?.state || "",
          publishedDate: {
            from: filtersToUse?.open_date_after || "",
            to: filtersToUse?.open_date_before || "",
          },
          closingDate: {
            from: filtersToUse?.close_date_after || "",
            to: filtersToUse?.close_date_before || "",
          },
          solicitationType: filtersToUse?.solicitation?.split(",") || [],
          naics_codes: filtersToUse?.naics_codes?.split(",") || [],
          unspsc_codes: filtersToUse?.unspsc_codes?.split(",") || [],
          includeKeywords: filtersToUse?.include?.split(",") || [],
          excludeKeywords: filtersToUse?.exclude?.split(",") || [],
        };

        console.log("Applying final filters: ", finalFilters);

        // ✅ Step 2: Set all states
        setSaveSearchFilters(finalFilters);
        setFilters(finalFilters);
        setAppliedFilters(finalFilters);
        setSelectedSavedSearch(searchName);
        setSearchOption("replace");
        fetchBidsWithParams(finalFilters); // send to server
      }


    } catch (err) {
      console.error("❌ Failed to fetch saved search filters", err);
    }
  };
  // useEffect(() => {
  //   console.log(savedSearches[0])
  //   handleSavedSearchSelect(savedSearches[0]);
  // }, [savedSearches]);

  const postSaveSearch = async (data) => {
    console.log(data.filters)
    const token = localStorage.getItem("access_token");
    const filtersToUse = data.filters;
    console.log(filtersToUse);
    const params = new URLSearchParams();

    const statusMap = {
      "Open Solicitations": "Active",
      "Closed Solicitations": "Inactive",
      "Awarded Solicitations": "Awarded",
    };

    const effectiveStatus = appliedFilters.status || "Open Solicitations";
    const mappedStatus = statusMap[effectiveStatus];
    if (mappedStatus) params.append("bid_type", mappedStatus);

    if (filtersToUse.keyword) params.append("bid_name", filtersToUse.keyword);
    if (filtersToUse.location) {
      const stateParam = filtersToUse.location.split(",").map((name) => name.trim()).join(",");
      params.append("state", stateParam);
    }

    if (filtersToUse.publishedDate?.from && filtersToUse.publishedDate?.to) {
      const fromDate = new Date(filtersToUse.publishedDate.from);
      const toDate = new Date(filtersToUse.publishedDate.to);
      if (fromDate <= toDate) {
        params.append("open_date_after", filtersToUse.publishedDate.from);
        params.append("open_date_before", filtersToUse.publishedDate.to);
      }
    }

    if (filtersToUse.closingDate?.from && filtersToUse.closingDate?.to) {
      const fromDate = new Date(filtersToUse.closingDate.from);
      const toDate = new Date(filtersToUse.closingDate.to);
      if (fromDate <= toDate) {
        params.append("close_date_after", filtersToUse.closingDate.from);
        params.append("close_date_before", filtersToUse.closingDate.to);
      }
    }

    if (filtersToUse.solicitationType?.length > 0) {
      params.append("solicitation", filtersToUse.solicitationType.join(","));
    }

    if (filtersToUse.naics_codes?.length > 0) {
      const codes = filtersToUse.naics_codes.map((item) =>
        typeof item === "string" ? item : item.code
      );
      params.append("naics_codes", codes.join(","));
    }

    if (filtersToUse.unspsc_codes?.length > 0) {
      const codes = filtersToUse.unspsc_codes.map((item) =>
        typeof item === "string" ? item : item.code
      );
      params.append("unspsc_codes", codes.join(","));
    }

    if (filtersToUse.includeKeywords?.length > 0) {
      params.append("include", filtersToUse.includeKeywords.join(","));
    }

    if (filtersToUse.excludeKeywords?.length > 0) {
      params.append("exclude", filtersToUse.excludeKeywords.join(","));
    }

    const queryString = `?${params.toString()}`;

    try {
      const body = {
        name: data.name,
        query_string: queryString,
        is_default: data.isDefault,
      };

      console.log(body)

      const resp = await api.post("/bids/saved-filters/", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp.data);
      // ✅ Set only needed values in filters (remove searchName)
      const { searchName, ...filtersWithoutSearchName } = filtersToUse;

      await fetchSavedSearches();
      setSelectedSavedSearch(data.name);
      handleSavedSearchSelect(data.name);

      if (searchOption === "apply") {
        setFilters(filtersWithoutSearchName);
      }

      setSaveSearchFilters({
        searchName: "",
        status: "",
        categories: [],
        keyword: "",
        location: "",
        publishedDate: { from: "", to: "" },
        closingDate: { from: "", to: "" },
        solicitationType: [],
        naics_codes: [],
        unspsc_codes: [],
        includeKeywords: [],
        excludeKeywords: [],
      });
      setSearchOption("replace");
      setSaveSearchToggle(false);
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

      const mappedStatus = statusMap[appliedFilters.status];
      if (mappedStatus) params.append("bid_type", mappedStatus);

      if (appliedFilters.keyword) {
        params.append("bid_name", appliedFilters.keyword);
      }

      if (appliedFilters.location) {
        const stateParam = appliedFilters.location
          .split(",")
          .map((name) => name.trim())
          .join(",");
        params.append("state", stateParam);
      }

      if (searchText.trim()) {
        params.append("search", searchText.trim());
      }

      if (appliedFilters.publishedDate?.from && appliedFilters.publishedDate?.to) {
        const fromDate = new Date(appliedFilters.publishedDate.from);
        const toDate = new Date(appliedFilters.publishedDate.to);
        if (fromDate <= toDate) {
          params.append("open_date_after", appliedFilters.publishedDate.from);
          params.append("open_date_before", appliedFilters.publishedDate.to);
        }
      }

      if (appliedFilters.closingDate?.from && appliedFilters.closingDate?.to) {
        const fromDate = new Date(appliedFilters.closingDate.from);
        const toDate = new Date(appliedFilters.closingDate.to);
        if (fromDate <= toDate) {
          params.append("close_date_after", appliedFilters.closingDate.from);
          params.append("close_date_before", appliedFilters.closingDate.to);
        }
      }

      if (appliedFilters.solicitationType?.length > 0) {
        params.append("solicitation", appliedFilters.solicitationType.join(","));
      }

      if (appliedFilters.naics_codes?.length > 0) {
        const codes = appliedFilters.naics_codes.map((item) =>
          typeof item === "string" ? item : item.code
        );
        params.append("naics_codes", codes.join(","));
      }

      if (appliedFilters.unspsc_codes?.length > 0) {
        const codes = appliedFilters.unspsc_codes.map((item) =>
          typeof item === "string" ? item : item.code
        );
        params.append("unspsc_codes", codes.join(","));
      }

      if (appliedFilters.includeKeywords?.length > 0) {
        params.append("include", appliedFilters.includeKeywords.join(","));
      }

      if (appliedFilters.excludeKeywords?.length > 0) {
        params.append("exclude", appliedFilters.excludeKeywords.join(","));
      }

      console.log("Final query params:", params.toString());

      const res = await api.get(`/bids/?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

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
  }, [currentPage, appliedFilters, searchText, navigate]);

  const fetchBidsWithParams = async (customFilters) => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("access_token");

    try {
      const params = new URLSearchParams();
      params.append("page", 1);
      params.append("pageSize", perPage);

      const statusMap = {
        "Open Solicitations": "Active",
        "Closed Solicitations": "Inactive",
        "Awarded Solicitations": "Awarded",
      };

      const mappedStatus = statusMap[customFilters.status];
      if (mappedStatus) params.append("bid_type", mappedStatus);

      if (customFilters.keyword) params.append("bid_name", customFilters.keyword);
      if (customFilters.location) {
        const stateParam = customFilters.location.split(",").map((s) => s.trim()).join(",");
        params.append("state", stateParam);
      }

      if (customFilters.publishedDate?.from && customFilters.publishedDate?.to) {
        params.append("open_date_after", customFilters.publishedDate.from);
        params.append("open_date_before", customFilters.publishedDate.to);
      }

      if (customFilters.closingDate?.from && customFilters.closingDate?.to) {
        params.append("close_date_after", customFilters.closingDate.from);
        params.append("close_date_before", customFilters.closingDate.to);
      }

      if (customFilters.solicitationType?.length > 0) {
        params.append("solicitation", customFilters.solicitationType.join(","));
      }

      if (customFilters.naics_codes?.length > 0) {
        const codes = customFilters.naics_codes.map((item) =>
          typeof item === "string" ? item : item.code
        );
        params.append("naics_codes", codes.join(","));
      }

      if (customFilters.unspsc_codes?.length > 0) {
        const codes = customFilters.unspsc_codes.map((item) =>
          typeof item === "string" ? item : item.code
        );
        params.append("unspsc_codes", codes.join(","));
      }

      if (customFilters.includeKeywords?.length > 0) {
        params.append("include", customFilters.includeKeywords.join(","));
      }

      if (customFilters.excludeKeywords?.length > 0) {
        params.append("exclude", customFilters.excludeKeywords.join(","));
      }

      const res = await api.get(`/bids/?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setCount(res.data.count);
      const bidList = res.data.results || res.data;
      setBids(bidList);
      setTotalResults(res.data.count || bidList.length);
    } catch (err) {
      console.error("❌ fetchBidsWithParams error:", err);
      setError("Failed to fetch bids");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Updated filters: ", filters);
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBids();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [appliedFilters, currentPage, searchText]);

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
    <>
      <div className="py-[120px] bg-blue">
        {sidebarToggle && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onClose={() => {
              setAppliedFilters(filters);
              setSidebarToggle(false);
              setCurrentPage(1);
            }}
            activeTab={activeFilterTab}
            setActiveTab={(tab) => {
              setActiveFilterTab(tab);
              localStorage.setItem("lastActiveFilterTab", tab);
            }}
            onApply={() => {
              setAppliedFilters(filters);
              setSidebarToggle(false);
              setCurrentPage(1);
            }}
          />


        )}

        {saveSearchToggle && (
          <FilterPanelSaveSearch
            filters={saveSearchFilters}
            setFilters={setSaveSearchFilters}
            onClose={() => setSaveSearchToggle(false)}
            onSave={postSaveSearch}
            selectedSearch={selectedSavedSearch}
            mode={searchOption}
            savedSearches={savedSearches} // ✅ NEW PROP PASS HERE
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
                  <div className="bg-btn p-4 rounded-[16px] cursor-pointer" onClick={handleExport} id="export">
                    <img src="export.png" className="w-6" alt="Export" />
                  </div>
                  <div className="saved-search bg-btn p-4 px-6 rounded-[30px] border-none font-inter font-medium">

                    <select
                      key={savedSearches.length}
                      className="bg-transparent text-white"
                      value={selectedSavedSearch}
                      onChange={(e) => handleSavedSearchSelect(e.target.value)}
                    >
                      {/* <option value="My Saved Search" className="text-black">
                        My Saved Searches
                      </option> */}

                      {savedSearches.map((search, index) => (
                        <option key={index} className="text-black" value={search}>
                          {/* {console.log(search)} */}
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
              <BidTable bids={bids} ref={tableRef} />
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
    </>
  );
}

export default Dashboard;