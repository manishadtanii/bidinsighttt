import React from "react";
import ProcessWrapper from "../components/ProcessWrapper";
import AlertToggle from "../components/AlertToggle";
import Heading from "../components/Heading";
import HeroHeading from "../components/HeroHeading";
import BgCover from "../components/BgCover";
import BidTable from "../components/BidTable";

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
        <BidTable/>
      </div>
    </div>
  );
}

export default Dashboard;
