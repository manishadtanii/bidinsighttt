import { useEffect, useState } from "react";

// Helper to format date string to 'Mon, DD'
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month}, ${day}`;
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

  const renderSelect = (key) => (
    <select
      onChange={(e) => handleSort(key, e.target.value)}
      className="bg-transparent text-white text-xs outline-none w-4"
      value={sortConfig.key === key ? sortConfig.order : ""}
    >
      <option className="" value=""></option>
      <option className="" value="az">A → Z</option>
      <option className="" value="za">Z → A</option>
    </select>
  );

  return (
    <div className=" rounded-2xl bg-btn text-white my-[50px] p-4 shadow-xl overflow-x-auto border-white border-2 border-solid">
      <table className="min-w-full table-auto  text-sm text-center">
        <thead>
          <tr className="text-white/80 text-xs border-b border-white/20">
            <th className="px-4 py-2 font-inter text-lg">
              Jurisdiction {renderSelect("jurisdiction")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Bid Name {renderSelect("bid_name")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Open Date {renderSelect("opening_date")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Closed Date {renderSelect("closing_date")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Status {renderSelect("status")}
            </th>
            <th className="px-4 py-2 font-inter text-lg text-center">Share</th>
            <th className="px-4 py-2 font-inter text-lg text-center">Follow</th>
          </tr>
        </thead>
        <tbody>
          {data.map((bid) => {
            // Convert boolean status to string
            let statusLabel = bid.status;
            if (typeof statusLabel === "boolean") {
              statusLabel = statusLabel ? "Active" : "Inactive";
            }
            
            // Remove '.gov' from source if present
            let sourceLabel = bid.source || "-";
            if (typeof sourceLabel === "string" && sourceLabel.endsWith('.gov')) {
              sourceLabel = sourceLabel.replace(/\.gov$/, "");
            }
            return (
              <tr key={bid.id} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="px-4 py-4 font-semibold font-inter">{bid.jurisdiction || "-"}</td>
                <td className="px-4 py-4 font-medium font-inter">{bid.bid_name || "-"}</td>
                <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
                <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
                <td className="px-4 py-4 font-medium font-inter">
                  <span className={`bg-white inline-flex items-center gap-1 text-xs font-medium px-4 py-3 rounded-full ${
                    statusLabel === "Active"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      statusLabel === "Active" ? "bg-green-500" : "bg-red-500"
                    }`} />
                    {statusLabel}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button><i className="fas fa-share-alt"></i></button>
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
