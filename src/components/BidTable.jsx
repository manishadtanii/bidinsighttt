// import React, {
//   useEffect,
//   useState,
//   useImperativeHandle,
//   forwardRef,
// } from "react";
// import { useNavigate } from "react-router-dom";

// // Helper to format date
// function formatDate(dateStr) {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   const month = date.toLocaleString("default", { month: "short" });
//   const day = date.getDate();
//   const year = date.getFullYear();
//   return `${month} ${day}, ${year}`;
// }

// // Countdown in days
// function getCountdown(closingDateStr) {
//   if (!closingDateStr) return "-";
//   const closing = new Date(closingDateStr);
//   const now = new Date();
//   const diffInMs = closing.getTime() - now.getTime();
//   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
//   if (isNaN(diffInDays)) return "-";
//   if (diffInDays < 0) return "Closed";
//   if (diffInDays === 0) return "Closes today";
//   return `${diffInDays} days`;
// }

// // Convert rows to CSV
// const convertToCSV = (rows) => {
//   if (!rows?.length) return "";

//   const headers = [
//     "Jurisdiction",
//     "Bid Name",
//     "Open Date",
//     "Closed Date",
//     "Countdown",
//     "Status",
//   ];

//   const csvRows = rows.map((bid) => [
//     `"${bid.jurisdiction ?? ""}"`,
//     `"${bid.bid_name ?? ""}"`,
//     `"${formatDate(bid.open_date)}"`,
//     `"${formatDate(bid.closing_date)}"`,
//     `"${getCountdown(bid.closing_date)}"`,
//     `"${typeof bid.status === "boolean" ? (bid.status ? "Active" : "Inactive") : bid.status}"`,
//   ]);

//   return [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
// };

// // Sort logic
// const sortFunctions = {
//   az: (a, b, key) => {
//     const aVal = (a[key] || "").toString().toLowerCase();
//     const bVal = (b[key] || "").toString().toLowerCase();
//     return aVal.localeCompare(bVal);
//   },
//   za: (a, b, key) => {
//     const aVal = (a[key] || "").toString().toLowerCase();
//     const bVal = (b[key] || "").toString().toLowerCase();
//     return bVal.localeCompare(aVal);
//   },
// };

// const BidTable = forwardRef(({ bids = [] }, ref) => {
//   console.log(bids)
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, order: null });

//   useEffect(() => {
//     setData(bids);
//     setOriginalData(bids);
//   }, [bids]);

//   const handleHeaderClick = (key) => {
//     let newOrder;
//     let newData;

//     if (sortConfig.key === key) {
//       if (sortConfig.order === "az") {
//         // Second click - sort Z to A
//         newOrder = "za";
//         newData = [...data].sort((a, b) => sortFunctions.za(a, b, key));
//       } else if (sortConfig.order === "za") {
//         // Third click - reset to original
//         newOrder = null;
//         newData = [...originalData];
//       } else {
//         // First click - sort A to Z
//         newOrder = "az";
//         newData = [...data].sort((a, b) => sortFunctions.az(a, b, key));
//       }
//     } else {
//       // First click on new column - sort A to Z
//       newOrder = "az";
//       newData = [...data].sort((a, b) => sortFunctions.az(a, b, key));
//     }

//     setData(newData);
//     setSortConfig({ key: newOrder ? key : null, order: newOrder });
//   };

//   const handleRowClick = (id) => navigate(`/summary/${id}`);

//   const handleShare = (e, id) => {
//     e.stopPropagation();
//     const url = `${window.location.origin}/summary/${id}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => alert("✅ Summary link copied to clipboard!"))
//       .catch(() => alert("❌ Failed to copy the link."));
//   };

//   const exportToCSV = () => {
//     const csv = convertToCSV(data);
//     const blob = new Blob(["\uFEFF" + csv], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     const timestamp = new Date()
//       .toISOString()
//       .slice(0, 19)
//       .replace(/[:T]/g, "-");
//     link.href = url;
//     link.setAttribute("download", `bids_export_${timestamp}.csv`);
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   // ✅ Expose method to parent via ref
//   useImperativeHandle(ref, () => ({
//     exportToCSV,
//   }));

//   const truncate = (text) => {
//     if (!text) return "-";
//     return text.length > 30 ? text.slice(0, 30) + "..." : text;
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return <i className="fas fa-sort ml-2 text-white/50"></i>;
//     }
//     if (sortConfig.order === "az") {
//       return <i className="fas fa-sort-up ml-2 text-white"></i>;
//     }
//     if (sortConfig.order === "za") {
//       return <i className="fas fa-sort-down ml-2 text-white"></i>;
//     }
//     return <i className="fas fa-sort ml-2 text-white/50"></i>;
//   };

//   return (
//     <div className="bid-table rounded-2xl bg-btn text-white my-[50px] shadow-xl overflow-x-auto border-white border-2 border-solid relative max-h-screen overflow-y-auto ">
//       <table className="min-w-full table-auto text-sm text-center">
//         <thead className="sticky top-0 bg-white/5 backdrop-blur-sm ">
//           <tr className="text-white/80 text-xs border-b border-white/20 ">
//             <th className="px-4 py-4 font-inter text-lg">
//               Entity Type 
//             </th>
//             <th 
//               className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//               onClick={() => handleHeaderClick("bid_name")}
//             >
//               Bid Name {getSortIcon("bid_name")}
//             </th>
//             <th 
//               className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//               onClick={() => handleHeaderClick("open_date")}
//             >
//               Open Date {getSortIcon("open_date")}
//             </th>
//             <th 
//               className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//               onClick={() => handleHeaderClick("closing_date")}
//             >
//               Closed Date {getSortIcon("closing_date")}
//             </th>
//             <th 
//               className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//               onClick={() => handleHeaderClick("closing_date")}
//             >
//               Countdown {getSortIcon("closing_date")}
//             </th>
//             <th className="px-4 py-4 font-inter text-lg">
//               Status
//             </th>
//             <th className="px-4 py-4 font-inter text-lg text-center">Share</th>
//             <th className="px-4 py-4 font-inter text-lg text-center">Follow</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((bid) => {
//             const statusLabel = bid.bid_type || "Unknown";

//             const countdownRaw = getCountdown(bid.closing_date);
//             let countdownDisplay = countdownRaw;

//             if (bid.status === false) {
//               // ✅ Show "Closed" directly for inactive
//               countdownDisplay = "Closed";
//             } else if (!["-", "Closed", "Closes today"].includes(countdownRaw)) {
//               const daysMatch = countdownRaw.match(/\d+/);
//               const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;

//               const years = Math.floor(days / 365);
//               const months = Math.floor((days % 365) / 30);
//               const remainingDays = days % 30;

//               let countdownParts = [];

//               if (years > 0) countdownParts.push(`${years}y`);
//               if (months > 0) countdownParts.push(`${months}m`);

//               // ✅ Only show days if no years or months
//               if (years === 0 && months === 0) {
//                 countdownParts.push(`${remainingDays}d`);
//               }

//               countdownDisplay = countdownParts.join(" ");
//             }

//             // ✅ If bid is inactive, force "Closed"
//             if (bid.status === false) {
//               countdownDisplay = "Closed";
//             }

//             return (
//               <tr
//                 key={bid.id}
//                 className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
//                 onClick={() => handleRowClick(bid.id)}
//               >
//                 <td className="px-4 py-4 font-semibold font-inter">
//                   {truncate(bid.entity_type)}
//                 </td>
//                 <td className="px-4 py-4 font-medium font-inter">
//                   {truncate(bid.bid_name)}
//                 </td>
//                 <td className="px-4 py-4 font-medium font-inter">
//                   {formatDate(bid.open_date)}
//                 </td>
//                 <td className="px-4 py-4 font-medium font-inter">
//                   {formatDate(bid.closing_date)}
//                 </td>
//                 <td className="px-4 py-4 font-medium font-inter" title={countdownRaw}>
//                   {countdownDisplay}
//                 </td>
//                 <td className="px-4 py-4 font-medium font-inter">
//                   {statusLabel}
//                 </td>
//                 <td className="btn-box px-4 py-4 text-center">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); // ✅ Prevents <tr> click
//                       if (navigator.share) {
//                         navigator
//                           .share({
//                             title: `Bid: ${bid.bid_name}`,
//                             text: `Check out this bid from ${bid.jurisdiction}`,
//                             url: `${window.location.origin}/summary/${bid.id}`,
//                           })
//                           .then(() => console.log("Shared successfully!"))
//                           .catch((err) => console.error("Share failed:", err));
//                       } else {
//                         alert("Sharing is not supported on this device.");
//                       }
//                     }}
//                   >
//                     <i className="fas fa-share-alt"></i>
//                   </button>
//                 </td>

//                 <td className="px-4 py-4 text-center">
//                   <button>
//                     <i
//                       className={`fas ${bid.followed ? "fa-minus-circle" : "fa-plus-circle"}`}
//                     ></i>
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}

//         </tbody>

//       </table>
//     </div>
//   );
// });

// export default BidTable;



import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useNavigate } from "react-router-dom";

// Helper to format date
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
  return `${diffInDays} days`;
}

// Convert rows to CSV
const convertToCSV = (rows) => {
  if (!rows?.length) return "";

  const headers = [
    "Jurisdiction",
    "Bid Name",
    "Open Date",
    "Closed Date",
    "Countdown",
    "Status",
  ];

  const csvRows = rows.map((bid) => [
    `"${bid.jurisdiction ?? ""}"`,
    `"${bid.bid_name ?? ""}"`,
    `"${formatDate(bid.open_date)}"`,
    `"${formatDate(bid.closing_date)}"`,
    `"${getCountdown(bid.closing_date)}"`,
    `"${typeof bid.status === "boolean" ? (bid.status ? "Active" : "Inactive") : bid.status}"`,
  ]);

  return [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
};

const BidTable = forwardRef(
  (
    {
      bids = [],
      totalCount = 0,
      currentSortField = "",
      currentSortOrder = "", 
      onSort = () => {},
    },
    ref
  ) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
      // Sort data by countdown priority: Closes soon → Days → Months → Years → Closed last
      const sortedData = [...bids].sort((a, b) => {
        const countdownA = getCountdown(a.closing_date);
        const countdownB = getCountdown(b.closing_date);
        
        console.log('🔥 Sorting - A:', countdownA, 'B:', countdownB);
        
        // Helper function to get sort priority
        const getSortPriority = (countdown, closingDate) => {
          // Check if bid is actually closed from status
          if (countdown === "Closed") return 999999; // Closed items go last
          if (countdown === "-") return 999998; // Invalid dates second last
          if (countdown === "Closes today") return 0; // Highest priority
          
          // Extract days from countdown string
          const match = countdown.match(/(\d+)/);
          if (match) {
            const days = parseInt(match[0], 10);
            console.log('🔥 Days extracted:', days, 'from:', countdown);
            return days; // Return actual days for sorting
          }
          return 999997; // Unknown format
        };
        
        const priorityA = getSortPriority(countdownA, a.closing_date);
        const priorityB = getSortPriority(countdownB, b.closing_date);
        
        console.log('🔥 Priority A:', priorityA, 'Priority B:', priorityB);
        
        return priorityA - priorityB; // Ascending order (soon to late)
      });
      
      console.log('🔥 Final sorted data length:', sortedData.length);
      setData(sortedData);
    }, [bids]);

    const handleRowClick = (id) => navigate(`/summary/${id}`);

    const exportToCSV = () => {
      const csv = convertToCSV(data);
      const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      link.href = url;
      link.setAttribute("download", `bids_export_${timestamp}.csv`);
      link.click();
      URL.revokeObjectURL(url);
    };

    useImperativeHandle(ref, () => ({
      exportToCSV,
    }));

    const truncate = (text) =>
      !text ? "-" : text.length > 30 ? text.slice(0, 30) + "..." : text;

    // Simple sort icon - keep same always, no change on click
    const getSortIcon = (field) => {
      return (
        <span className="ml-2">
          <i className="fas fa-sort-down text-white/70 text-xs -ml-1"></i>
        </span>
      );
    };

    const handleHeaderClick = (field, e) => {
      e.stopPropagation(); // prevent row click
      console.log(`🔥 Sorting by field: ${field}`);
      onSort(field);
    };

    // Debug logging
    console.log('🔥 BidTable currentSortField:', currentSortField);
    console.log('🔥 BidTable data count:', data.length);

    return (
      <div className="bid-table rounded-2xl bg-btn text-white my-[50px] shadow-xl overflow-x-auto border-white border-2 border-solid relative max-h-screen overflow-y-auto">
        <table className="min-w-full table-auto text-sm text-center">
          <thead className="sticky top-0 bg-white/5 backdrop-blur-sm">
            <tr className="text-white/80 text-xs border-b border-white/20">
              <th className="px-4 py-4 font-inter text-lg">Entity Type</th>

              {/* Sortable headers with simple up/down icons */}
              <th
                className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
                onClick={(e) => handleHeaderClick("bid_name", e)}
              >
                Bid Name {getSortIcon("bid_name")}
              </th>
              
              <th
                className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
                onClick={(e) => handleHeaderClick("open_date", e)}
              >
                Open Date {getSortIcon("open_date")}
              </th>
              
              <th
                className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
                onClick={(e) => handleHeaderClick("closing_date", e)}
              >
                Closed Date {getSortIcon("closing_date")}
              </th>
              
              {/* Countdown uses closing_date for sorting */}
              <th
                className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
                onClick={(e) => handleHeaderClick("closing_date", e)}
                title="Sorted by closing date"
              >
                Countdown {getSortIcon("closing_date")}
              </th>

              <th className="px-4 py-4 font-inter text-lg">Status</th>
              <th className="px-4 py-4 font-inter text-lg text-center">Share</th>
              <th className="px-4 py-4 font-inter text-lg text-center">Follow</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-white/60">
                  No bids found
                </td>
              </tr>
            ) : (
              data.map((bid) => {
                const statusLabel = bid.bid_type || "Unknown";
                const countdownRaw = getCountdown(bid.closing_date);
                let countdownDisplay = countdownRaw;

                // Enhanced logic to handle closed bids and prioritize soon-to-close bids
                if (bid.status === false || statusLabel.toLowerCase() === 'closed') {
                  countdownDisplay = "Closed";
                } else if (countdownRaw === "Closed") {
                  countdownDisplay = "Closed";
                } else if (!["-", "Closed", "Closes today"].includes(countdownRaw)) {
                  const days = parseInt(countdownRaw.match(/\d+/)?.[0] || "0", 10);
                  
                  if (days <= 0) {
                    countdownDisplay = "Closed";
                  } else if (days === 1) {
                    countdownDisplay = "1 day";
                  } else if (days < 30) {
                    countdownDisplay = `${days} days`;
                  } else if (days < 365) {
                    const months = Math.floor(days / 30);
                    const remainingDays = days % 30;
                    if (remainingDays === 0) {
                      countdownDisplay = `${months}m`;
                    } else {
                      countdownDisplay = `${months}m ${remainingDays}d`;
                    }
                  } else {
                    const years = Math.floor(days / 365);
                    const months = Math.floor((days % 365) / 30);
                    const remainingDays = (days % 365) % 30;
                    
                    const parts = [];
                    if (years > 0) parts.push(`${years}y`);
                    if (months > 0) parts.push(`${months}m`);
                    if (years === 0 && remainingDays > 0) parts.push(`${remainingDays}d`);
                    
                    countdownDisplay = parts.join(" ");
                  }
                }

                return (
                  <tr
                    key={bid.id}
                    className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
                    onClick={() => handleRowClick(bid.id)}
                  >
                    <td className="px-4 py-4 font-semibold font-inter">{truncate(bid.entity_type)}</td>
                    <td className="px-4 py-4 font-medium font-inter">{truncate(bid.bid_name)}</td>
                    <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
                    <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
                    <td className="px-4 py-4 font-medium font-inter" title={countdownRaw}>
                      <span className="text-white">
                        {countdownDisplay}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-medium font-inter">{statusLabel}</td>
                    <td className="btn-box px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.share) {
                            navigator
                              .share({
                                title: `Bid: ${bid.bid_name}`,
                                text: `Check out this bid from ${bid.jurisdiction}`,
                                url: `${window.location.origin}/summary/${bid.id}`,
                              })
                              .then(() => console.log("Shared successfully!"))
                              .catch((err) => console.error("Share failed:", err));
                          } else {
                            alert("Sharing is not supported on this device.");
                          }
                        }}
                      >
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button>
                        <i
                          className={`fas ${
                            bid.followed ? "fa-minus-circle" : "fa-plus-circle"
                          }`}
                        ></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

export default BidTable;