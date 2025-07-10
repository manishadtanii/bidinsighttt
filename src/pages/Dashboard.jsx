import React, { useEffect, useState, useRef } from "react";
import AlertToggle from "../components/AlertToggle";
import HeroHeading from "../components/HeroHeading";
import BgCover from "../components/BgCover";
import BidTable from "../components/BidTable";
import api from "../utils/axios";
import Pagination from "../components/Pagination";
import FilterPanel from "../components/FilterPanel";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const data = { title: "Dashboard" };

  const [filters, setFilters] = useState({
    status: "Open Solicitations",
    categories: [],
    keyword: "",
    location: "",
    publishedDate: { from: "", to: "" },
    closingDate: { from: "", to: "" },
    solicitationType: [],
  });

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const perPage = 25;
  const bidsSectionRef = useRef(null);
  const [count, setCount] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const middle = [
    { id: 1, title: "Total Bids", num: totalResults },
    { id: 2, title: "Active Bids", num: count },
    { id: 3, title: "New Bids", num: count },
    { id: 4, title: "Saved", num: "0" },
    { id: 5, title: "Followed", num: "0/25" },
  ];

  useEffect(() => {
    async function fetchBids() {
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
          const stateParam = filters.location.split(",").map(name => name.trim()).join(",");
          params.append("state", stateParam);
        }


        // Published Date
        if (filters.publishedDate?.from && filters.publishedDate?.to) {
          const fromDate = new Date(filters.publishedDate.from);
          const toDate = new Date(filters.publishedDate.to);
          if (fromDate <= toDate) {
            params.append("open_date_after", filters.publishedDate.from);
            params.append("open_date_before", filters.publishedDate.to);
          }
        }

        // Closing Date
        if (filters.closingDate?.from && filters.closingDate?.to) {
          const fromDate = new Date(filters.closingDate.from);
          const toDate = new Date(filters.closingDate.to);
          if (!isNaN(fromDate) && !isNaN(toDate) && fromDate <= toDate) {
            params.append("close_date_after", filters.closingDate.from);
            params.append("close_date_before", filters.closingDate.to);
          }
        }

        console.log("Current Filters:", filters);
        console.log("Query Params:", params.toString());

        const res = await api.get(
          `http://82.112.234.104:8001/api/bids/?${params.toString()}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

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
    }

    fetchBids();
  }, [
    currentPage,
    filters.status,
    filters.categories,
    filters.keyword,
    filters.location,
    filters.publishedDate.from,
    filters.publishedDate.to,
    filters.closingDate.from,
    filters.closingDate.to,
    filters.solicitationType,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (bidsSectionRef.current) {
      bidsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-blue h-screen overflow-scroll">
      {sidebarToggle && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onClose={() => setSidebarToggle(false)}
        />
      )}

      <div className="container-fixed py-10 px-4">
        {/* Header */}
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
              />
            </div>
          </div>
        </div>

        {/* Middle Cards */}
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

        {/* Feature Row */}
        <div className="dashboard-feature">
          <div className="flex justify-between">
            <div className="feature-left">
              <div
                className="bg-btn p-4 w-[56px] h-[56px] rounded-[16px] flex justify-center items-center cursor-pointer"
                onClick={() => setSidebarToggle(true)}
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
                    <option className="text-black" value="My Saved Searches" defaultValue>
                      My Saved Searches
                    </option>
                  </select>
                </div>
                <BgCover>
                  <div className="text-white">Save Search</div>
                </BgCover>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Table & Pagination */}
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
