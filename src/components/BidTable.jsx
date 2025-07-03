import { useEffect, useState } from "react";

const dummyData = [
  { id: 1, state: "TN", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 25", close: "Jul, 25", status: "Active", followed: false },
  { id: 2, state: "CA", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 10", close: "Jul, 10", status: "Inactive", followed: true },
  { id: 3, state: "NY", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 20", close: "Jul, 22", status: "Active", followed: false },
  { id: 1, state: "TN", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 25", close: "Jul, 25", status: "Active", followed: false },
  { id: 2, state: "CA", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 10", close: "Jul, 10", status: "Inactive", followed: true },
  { id: 3, state: "NY", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 20", close: "Jul, 22", status: "Active", followed: false },
  { id: 1, state: "TN", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 25", close: "Jul, 25", status: "Active", followed: false },
  { id: 2, state: "CA", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 10", close: "Jul, 10", status: "Inactive", followed: true },
  { id: 3, state: "NY", name: "Canvas Learning Management Tool (LMS) ", open: "Jun, 20", close: "Jul, 22", status: "Active", followed: false },
];

const sortFunctions = {
  az: (a, b, key) => a[key].localeCompare(b[key]),
  za: (a, b, key) => b[key].localeCompare(a[key]),
};

const BidTable = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, order: "az" });

  useEffect(() => {
    setData(dummyData);
  }, []);

  const handleSort = (key, order) => {
    const sorted = [...data].sort((a, b) => sortFunctions[order](a, b, key));
    setData(sorted);
    setSortConfig({ key, order });
  };

  const renderSelect = (key) => (
    <select
      onChange={(e) => handleSort(key, e.target.value)}
      className="bg-transparent text-white text-xs outline-none w-4"
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
              Gov. Level {renderSelect("state")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Bid Name {renderSelect("name")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Open Date {renderSelect("open")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Closed Date {renderSelect("close")}
            </th>
            <th className="px-4 py-2 font-inter text-lg">
              Status {renderSelect("status")}
            </th>
            <th className="px-4 py-2 font-inter text-lg text-center">Share</th>
            <th className="px-4 py-2 font-inter text-lg text-center">Follow</th>
          </tr>
        </thead>
        <tbody>
          {data.map((bid) => (
            <tr key={bid.id} className="border-b border-white/10 hover:bg-white/5 transition">
              <td className="px-4 py-4 font-semibold font-inter">{bid.state}</td>
              <td className="px-4 py-4 font-medium font-inter">{bid.name}</td>
              <td className="px-4 py-4 font-medium font-inter">{bid.open}</td>
              <td className="px-4 py-4 font-medium font-inter">{bid.close}</td>
              <td className="px-4 py-4 font-medium font-inter">
                <span className={`bg-white inline-flex items-center gap-1 text-xs font-medium px-4 py-3 rounded-full ${
                  bid.status === "Active"
                    ? "text-green-700"
                    : "text-red-700"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    bid.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`} />
                  {bid.status}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidTable;
