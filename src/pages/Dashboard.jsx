import React, { useEffect, useState } from "react";
import ProcessWrapper from "../components/ProcessWrapper";
import AlertToggle from "../components/AlertToggle";
import Heading from "../components/Heading";
import HeroHeading from "../components/HeroHeading";
import BgCover from "../components/BgCover";
import BidTable from "../components/BidTable";
import api from "../utils/axios";

function Dashboard() {
  const data = {
    title: "Dashboard",
    // container: "max-w-4xl mx-auto text-center",
  };
  const middle = [
    { id: 1, title: "Active Bids", num: "315" },
    { id: 2, title: "New Bids", num: "315" },
    { id: 3, title: "Saved", num: "15" },
    { id: 4, title: "Followed", num: "10/25" },
  ];

  // State for bids
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBids() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("refresh_token");
        const res = await api.get("/bids/?bid_name=DC Motor Test Stand&page=2", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        console.log(res.data);
        // If response is paginated, use res.data.results, else res.data
        const bidList = res.data.results || res.data;
        setBids(bidList);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.code === "token_not_valid") {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to fetch bids");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBids();
  }, []);

  return (
    <div className="bg-blue h-screen overflow-scroll">
      <div className="container-fixed py-10 px-4">
        <div className="dashboard-header  flex justify-between items-center">
          <div className="title">
            <HeroHeading data={data} />
          </div>
          <div className="flex items-center gap-[15px]">
            <span className="font-inter text-[#DBDBDB]">Alert</span>{" "}
            <AlertToggle />
          </div>
        </div>
        <div className="dashboard-middle">
          <div className="max-w-[800px] py-[80px] flex justify-center mx-auto gap-8">
            {middle.map((item) => (
              <BgCover key={item.id}>
                <div className="flex gap-4">
                  <div className="text font-inter text-[#DBDBDB]">
                    {item.title}
                  </div>
                  <p className="num font-inter font-bold text-white">
                    {item.num}
                  </p>
                </div>
              </BgCover>
            ))}
          </div>
        </div>
        <div className="dashboard-feature">
          <div className="flex justify-between">
            <div className="feature-left">
              <div className="flex gap-2 items-end ">
                <div className="text font-inter text-[#DBDBDB]">
                  Total Bids:
                </div>
                <p className="num font-inter font-bold text-white">315</p>
              </div>
            </div>
            <div className="feature-right">
              <div className="flex gap-4">
                <div className="bg-btn p-4 rounded-[16px]" id="filter">
                  <img src="filter.png" className="w-6" alt="" />
                </div>
                <div className="bg-btn p-4 rounded-[16px]" id="export">
                  <img src="export.png" className="w-6" alt="" />
                </div>
                <div className="search-box bg-btn p-4 px-6 flex gap-3 items-center rounded-[30px]">
                  <i class="far text-white fa-search"></i>
                  <input type="text" placeholder="Search titles or organization or location" className="text-white bg-transparent w-[300px]  border-none outline-none" />
                </div>
                <BgCover>
                  <div className="text-white">Save Search</div>
                </BgCover>
              </div>
            </div>
          </div>
        </div>
        {/* Pass bids to BidTable, show loading/error if needed */}
        {loading ? (
          <div className="text-white text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-10">{error}</div>
        ) : (
          <BidTable bids={bids} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
