import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper to format date string
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

// Countdown in days
function getCountdown(closingDateStr) {
  if (!closingDateStr) return "-";

  const closing = new Date(closingDateStr);
  const now = new Date();

  const diffInMs = closing.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (isNaN(diffInDays)) return "-";
  if (diffInDays < 0) return "Closed";
  if (diffInDays === 0) return "Closes today";
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
}

const sortFunctions = {
  az: (a, b, key) => {
    const aVal = (a[key] || "").toString().toLowerCase();
    const bVal = (b[key] || "").toString().toLowerCase();
    return aVal.localeCompare(bVal);
  },
  za: (a, b, key) => {
    const aVal = (a[key] || "").toString().toLowerCase();
    const bVal = (b[key] || "").toString().toLowerCase();
    return bVal.localeCompare(aVal);
  },
};

const BidTable = ({ bids = [] }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, order: "az" });

  useEffect(() => {
    setData(bids);
  }, [bids]);

  const handleSort = (key, order) => {
    const sorted = [...data].sort((a, b) => sortFunctions[order](a, b, key));
    setData(sorted);
    setSortConfig({ key, order });
  };

  const handleRowClick = (id) => {
    navigate(`/summary/${id}`);
  };

  const handleShare = (e, id) => {
    e.stopPropagation();
    const url = `${window.location.origin}/summary/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => alert("✅ Summary link copied to clipboard!"))
      .catch(() => alert("❌ Failed to copy the link."));
  };

  const truncate = (text) => {
    if (!text) return "-";
    return text.length > 30 ? text.slice(0, 30) + "..." : text;
  };

  const renderSelect = (key) => (
    <select
      onChange={(e) => handleSort(key, e.target.value)}
      className="bg-transparent text-white text-xs outline-none w-4"
      value={sortConfig.key === key ? sortConfig.order : ""}
    >
      <option value=""></option>
      <option value="az">A → Z</option>
      <option value="za">Z → A</option>
    </select>
  );

  return (
    <div className="rounded-2xl bg-btn text-white my-[50px] p-4 shadow-xl overflow-x-auto border-white border-2 border-solid">
      <table className="min-w-full table-auto text-sm text-center">
        <thead>
          <tr className="text-white/80 text-xs border-b border-white/20">
            <th className="px-4 py-2 font-inter text-lg">Jurisdiction {renderSelect("jurisdiction")}</th>
            <th className="px-4 py-2 font-inter text-lg">Bid Name {renderSelect("bid_name")}</th>
            <th className="px-4 py-2 font-inter text-lg">Open Date {renderSelect("open_date")}</th>
            <th className="px-4 py-2 font-inter text-lg">Closed Date {renderSelect("closing_date")}</th>
            <th className="px-4 py-2 font-inter text-lg">Countdown {renderSelect("closing_date")}</th>
            <th className="px-4 py-2 font-inter text-lg">Status {renderSelect("status")}</th>
            <th className="px-4 py-2 font-inter text-lg text-center">Share</th>
            <th className="px-4 py-2 font-inter text-lg text-center">Follow</th>
          </tr>
        </thead>
        <tbody>
          {data.map((bid) => {
            let statusLabel = typeof bid.status === "boolean"
              ? bid.status ? "Active" : "Inactive"
              : bid.status;

            return (
              <tr
                key={bid.id}
                className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
                onClick={() => handleRowClick(bid.id)}
              >
                <td className="px-4 py-4 font-semibold font-inter">{truncate(bid.jurisdiction)}</td>
                <td className="px-4 py-4 font-medium font-inter">{truncate(bid.bid_name)}</td>
                <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
                <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
                <td className="px-4 py-4 font-medium font-inter">
                  {(() => {
                    const raw = getCountdown(bid.closing_date);
                    if (["-", "Closed", "Closes today"].includes(raw)) return raw;

                    const days = parseInt(raw.split(" ")[0]);
                    const years = Math.floor(days / 365);
                    const months = Math.floor((days % 365) / 30);
                    const label = `${years > 0 ? `${years}y ` : ""}${months > 0 ? `${months}m` : ""}`.trim();
                    return <span title={`${days} days`}>{label}</span>;
                  })()}
                </td>
                <td className="px-4 py-4 font-medium font-inter">{statusLabel}</td>
                <td className="px-4 py-4 text-center">
                  <button onClick={(e) => handleShare(e, bid.id)}>
                    <i className="fas fa-share-alt"></i>
                  </button>
                </td>
                <td className="px-4 py-4 text-center">
                  <button>
                    <i className={`fas ${bid.followed ? "fa-minus-circle" : "fa-plus-circle"}`}></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BidTable;
