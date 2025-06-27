import React from "react";
import {
  faChartLine,
  faFileInvoice,
  faClock,
  faBell,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sidebarItems = [
  { label: "Dashboard", icon: faChartLine },
  { label: "Bids", icon: faFileInvoice },
  { label: "History", icon: faClock },
  { label: "Alerts", icon: faBell },
];

const cardsData = [
  { label: "Total Bids", value: "234", icon: faFileInvoice },
  { label: "Open Bids", value: "87", icon: faChartLine },
  { label: "Pending", value: "29", icon: faClock },
  { label: "New Alerts", value: "14", icon: faBell },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 font-bold text-xl">BidInsight</div>
        <nav className="flex flex-col gap-4 p-4">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer"
            >
              <FontAwesomeIcon icon={item.icon} className="text-blue-600" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-72"
            />
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
            <span className="font-medium">Mark Joseph</span>
          </div>
        </header>

        {/* Cards */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow flex items-center gap-4"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <FontAwesomeIcon icon={card.icon} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <h3 className="text-2xl font-bold">{card.value}</h3>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Activity */}
        <section className="p-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2">Bid Name</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Airport Maintenance</td>
                    <td className="py-2">June 8, 2025</td>
                    <td className="py-2">Submitted</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">IT Infrastructure Upgrade</td>
                    <td className="py-2">June 7, 2025</td>
                    <td className="py-2">Pending</td>
                  </tr>
                  <tr>
                    <td className="py-2">Healthcare Procurement</td>
                    <td className="py-2">June 6, 2025</td>
                    <td className="py-2">Accepted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
