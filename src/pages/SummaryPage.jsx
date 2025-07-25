import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BidHeader from "../sections/summary/BidHeader";
import SummaryContent from "../sections/summary/SummaryContent";
import BidTracking from "../sections/summary/BidTracking";
import AiFeature from "../sections/summary/AiFeature";
import SimilarBids from "../sections/summary/SimilarBids";
import api from "../utils/axios";
// import "../custom.css"; // Ensure this is imported for custom styles

function SummaryPage() {
  const { id } = useParams();
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallback = {
    bid_name: "Unknown Bid",
    jurisdiction: "Unknown Organization",
    state: { name: "Unknown Location" },
    open_date: "-",
    closing_date: "-",
  };

  useEffect(() => {
    const fetchBid = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get(`/bids/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBid(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch bid", err);
        setBid(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBid();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  const bidData = bid || fallback;
  console.log("Bid Data:", bidData);

  return (
    <div className="py-[120px] bg-blue">
      <div className="min-h-screen bg-gradient-to-br text-white p-4 sm:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md shadow-xl">
            <BidHeader
              title={fallback.bid_name || "No Title"}
              org={fallback.jurisdiction || "Unknown Organization"}
              location={fallback.state?.name || "Unknown Location"}
              postedDate={
                fallback.open_date
                  ? new Date(fallback.open_date).toLocaleDateString()
                  : "-"
              }
              deadline={fallback.closing_date}
              sourceLink={fallback.source}
            />
          </div>

          {/* Summary Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
            <SummaryContent  />
          </div>

          {/* Bid Tracking + AI Features + Similar Bids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
                <BidTracking  />
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
                <SimilarBids  />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl">
              <AiFeature  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;