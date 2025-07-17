import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faRedo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const similarBidsData = [
  {
    title: "Omnivex Annual Subscription",
    org: "ODM",
    postedDate: "Jun. 27",
    deadline: "Jul. 11",
    link: "#",
  },
  {
    title: "Digital Display Maintenance",
    org: "OH Medicaid Dept",
    postedDate: "Jun. 20",
    deadline: "Jul. 10",
    link: "#",
  },
];

function SimilarBids() {
  return (
    <div className="summary">
      <div className="space-y-6 text-white container-fixed">
        <h1 className="font-archivo font-semibold text-p xl:text-[30px]">
          Similar Bids
        </h1>

        <div className="divide-y divide-white/20">
          {similarBidsData.map((bid, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
            >
              <div className="space-y-1">
                <p className="font-archivo text-p font-bold">{bid.title}</p>
                <p className="text-xl text-[#DBDBDB]">{bid.org}</p>
              </div>

              <div className="text-sm space-y-1 sm:text-right">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>
                    <span className="text-[#DBDBDB] ml-1">Posted: </span>
                    {bid.postedDate}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faRedo} />
                  <span>
                    <span className="text-[#DBDBDB] ml-1">Deadline: </span>
                    {bid.deadline}
                  </span>
                </div>
              </div>

              <div>
                <Link
                  to={bid.link}
                  className="text-white hover:text-[#DBDBDB] transition underline font-inter"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right pt-2">
          <Link
            to="/"
            className="text-white hover:text-[#DBDBDB] font-medium transition underline"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SimilarBids;