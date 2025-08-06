//   import React, {
//     useEffect,
//     useState,
//     useImperativeHandle,
//     forwardRef,
//   } from "react";
//   import { useNavigate } from "react-router-dom";

//   // Helper to format date
//   function formatDate(dateStr) {
//     if (!dateStr) return "-";
//     const date = new Date(dateStr);
//     const month = date.toLocaleString("default", { month: "short" });
//     const day = date.getDate();
//     const year = date.getFullYear();
//     return `${month} ${day}, ${year}`;
//   }

//   // Countdown in days
//   function getCountdown(closingDateStr) {
//     if (!closingDateStr) return "-";
//     const closing = new Date(closingDateStr);
//     const now = new Date();
//     const diffInMs = closing.getTime() - now.getTime();
//     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
//     if (isNaN(diffInDays)) return "-";
//     if (diffInDays < 0) return "Closed";
//     if (diffInDays === 0) return "Closes today";
//     if (diffInDays === 1) return "1 day";
//     return `${diffInDays} days`;
//   }

//   // Convert rows to CSV
//   const convertToCSV = (rows) => {
//     if (!rows?.length) return "";

//     const headers = [
//       "Jurisdiction",
//       "Bid Name",
//       "Open Date",
//       "Closed Date",
//       "Countdown",
//       "Status",
//     ];

//     const csvRows = rows.map((bid) => [
//       `"${bid.jurisdiction ?? ""}"`,
//       `"${bid.bid_name ?? ""}"`,
//       `"${formatDate(bid.open_date)}"`,
//       `"${formatDate(bid.closing_date)}"`,
//       `"${getCountdown(bid.closing_date)}"`,
//       `"${typeof bid.status === "boolean" ? (bid.status ? "Active" : "Inactive") : bid.status}"`,
//     ]);

//     return [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
//   };

//   const BidTable = forwardRef(
//     (
//       {
//         bids = [],
//         totalCount = 0,
//         currentSortField = "",
//         currentSortOrder = "",
//         onSort = () => { },
//       },
//       ref
//     ) => {
//       const navigate = useNavigate();
//       const [data, setData] = useState([]);

//       useEffect(() => {

//         setData([...bids]);
//       }, [bids]);

//       const handleRowClick = (id) => navigate(`/summary/${id}`);

//       const exportToCSV = () => {
//         const csv = convertToCSV(data);
//         const blob = new Blob(["\uFEFF" + csv], {
//           type: "text/csv;charset=utf-8;",
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
//         link.href = url;
//         link.setAttribute("download", `bids_export_${timestamp}.csv`);
//         link.click();
//         URL.revokeObjectURL(url);
//       };

//       useImperativeHandle(ref, () => ({
//         exportToCSV,
//       }));

//       const truncate = (text) =>
//         !text ? "-" : text.length > 30 ? text.slice(0, 30) + "..." : text;

//       // Simple sort icon - keep same always, no change on click
//       // Replace getSortIcon function:
//       const getSortIcon = (field) => {
//         const isCurrentField = currentSortField === field || currentSortField === `-${field}`;
//         const isDescending = currentSortField === `-${field}`;

//         if (!isCurrentField) {
//           return <span className="ml-2"><i className="fas fa-sort text-white/50 text-xs"></i></span>;
//         }

//         return (
//           <span className="ml-2">
//             <i className={`fas ${isDescending ? 'fa-sort-down' : 'fa-sort-up'} text-white text-xs`}></i>
//           </span>
//         );
//       };

//       const handleHeaderClick = (field, e) => {
//         e.stopPropagation(); // prevent row click
//         // console.log(`🔥 Sorting by field: ${field}`);
//         onSort(field);
//       };

//       // Debug logging
//       // console.log('🔥 BidTable currentSortField:', currentSortField);
//       // console.log('🔥 BidTable data count:', data.length);

//       return (
//         <div className="bid-table rounded-2xl bg-btn text-white my-[50px] shadow-xl overflow-x-auto border-white border-2 border-solid relative max-h-screen overflow-y-auto">
//           <table className="min-w-full table-auto text-sm text-center">
//             <thead className="sticky top-0 bg-white/5 backdrop-blur-sm">
//               <tr className="text-white/80 text-xs border-b border-white/20">
//                 <th className="px-4 py-4 font-inter text-lg">Entity Type</th>

//                 {/* Sortable headers with simple up/down icons */}
//                 <th
//                   className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//                   onClick={(e) => handleHeaderClick("bid_name", e)}
//                 >
//                   Bid Name {getSortIcon("bid_name")}
//                 </th>

//                 <th
//                   className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//                   onClick={(e) => handleHeaderClick("open_date", e)}
//                 >
//                   Open Date {getSortIcon("open_date")}
//                 </th>

//                 <th
//                   className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//                   onClick={(e) => handleHeaderClick("closing_date", e)}
//                 >
//                   Closed Date {getSortIcon("closing_date")}
//                 </th>

//                 {/* Countdown uses closing_date for sorting */}
//                 <th
//                   className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
//                   onClick={(e) => handleHeaderClick("closing_date", e)}
//                   title="Sorted by closing date"
//                 >
//                   Countdown {getSortIcon("closing_date")}
//                 </th>

//                 <th className="px-4 py-4 font-inter text-lg">Status</th>
//                 <th className="px-4 py-4 font-inter text-lg text-center">Share</th>
//                 <th className="px-4 py-4 font-inter text-lg text-center">Follow</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-4 py-8 text-center text-white/60">
//                     No bids found
//                   </td>
//                 </tr>
//               ) : (
//                 data.map((bid) => {
//                   const statusLabel = bid.bid_type || "Unknown";
//                   const countdownRaw = getCountdown(bid.closing_date);
//                   let countdownDisplay = countdownRaw;

//                   // 🔥 NEW LOGIC: If bid_type is 'Inactive', always show 'Closed'
//                   if (statusLabel.toLowerCase() === 'inactive') {
//                     countdownDisplay = "Closed";
//                   }
//                   // Enhanced logic to handle closed bids and prioritize soon-to-close bids
//                   else if (bid.status === false || statusLabel.toLowerCase() === 'closed') {
//                     countdownDisplay = "Closed";
//                   } else if (countdownRaw === "Closed") {
//                     countdownDisplay = "Closed";
//                   } else if (!["-", "Closed", "Today"].includes(countdownRaw)) {
//                     const days = parseInt(countdownRaw.match(/\d+/)?.[0] || "0", 10);

//                     if (days <= 0) {
//                       countdownDisplay = "Closed";
//                     } else if (days === 1) {
//                       countdownDisplay = "Today";
//                     } else if (days < 30) {
//                       countdownDisplay = `${days} days`;
//                     } else if (days < 365) {
//                       const months = Math.floor(days / 30);
//                       const remainingDays = days % 30;
//                       if (remainingDays === 0) {
//                         countdownDisplay = `${months}m`;
//                       } else {
//                         countdownDisplay = `${months}mo ${remainingDays}d`;
//                       }
//                     } else {
//                       const years = Math.floor(days / 365);
//                       const months = Math.floor((days % 365) / 30);
//                       const remainingDays = (days % 365) % 30;

//                       const parts = [];
//                       if (years > 0) parts.push(`${years}y`);
//                       if (months > 0) parts.push(`${months}m`);
//                       if (years === 0 && remainingDays > 0) parts.push(`${remainingDays}d`);

//                       countdownDisplay = parts.join(" ");
//                     }
//                   }

//                   return (
//                     <tr
//                       key={bid.id}
//                       className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
//                       onClick={() => handleRowClick(bid.id)}
//                     >
//                       <td className="px-4 py-4 font-semibold font-inter">{truncate(bid.entity_type)}</td>
//                       <td className="px-4 py-4 font-medium font-inter">{truncate(bid.bid_name)}</td>
//                       <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
//                       <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
//                       <td className="px-4 py-4 font-medium font-inter" title={countdownRaw}>
//                         <span className="text-white">
//                           {countdownDisplay}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4 font-medium font-inter">{statusLabel}</td>
//                       <td className="btn-box px-4 py-4 text-center">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             if (navigator.share) {
//                               navigator
//                                 .share({
//                                   title: `Bid: ${bid.bid_name}`,
//                                   text: `Check out this bid from ${bid.jurisdiction}`,
//                                   url: `${window.location.origin}/summary/${bid.id}`,
//                                 })
//                                 .then(() => console.log("Shared successfully!"))
//                                 .catch((err) => console.error("Share failed:", err));
//                             } else {
//                               alert("Sharing is not supported on this device.");
//                             }
//                           }}
//                         >
//                           <i className="fas fa-share-alt"></i>
//                         </button>
//                       </td>
//                       <td className="px-4 py-4 text-center">
//                         <button>
//                           <i
//                             className={`fas ${bid.followed ? "fa-minus-circle" : "fa-plus-circle"
//                               }`}
//                           ></i>
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   );

//   export default BidTable;








// // import React, {
// //   useEffect,
// //   useState,
// //   useImperativeHandle,
// //   forwardRef,
// // } from "react";
// // import { useNavigate } from "react-router-dom";

// // // Helper to format date
// // function formatDate(dateStr) {
// //   if (!dateStr) return "-";
// //   const date = new Date(dateStr);
// //   const month = date.toLocaleString("default", { month: "short" });
// //   const day = date.getDate();
// //   const year = date.getFullYear();
// //   return `${month} ${day}, ${year}`;
// // }

// // // Countdown in days
// // function getCountdown(closingDateStr) {
// //   if (!closingDateStr) return "-";
// //   const closing = new Date(closingDateStr);
// //   const now = new Date();
// //   const diffInMs = closing.getTime() - now.getTime();
// //   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
// //   if (isNaN(diffInDays)) return "-";
// //   if (diffInDays < 0) return "Closed";
// //   if (diffInDays === 0) return "Closes today";
// //   if (diffInDays === 1) return "1 day";
// //   return `${diffInDays} days`;
// // }

// // // Convert rows to CSV
// // const convertToCSV = (rows) => {
// //   if (!rows?.length) return "";

// //   const headers = [
// //     "Jurisdiction",
// //     "Bid Name",
// //     "Open Date",
// //     "Closed Date",
// //     "Countdown",
// //     "Status",
// //   ];

// //   const csvRows = rows.map((bid) => [
// //     `"${bid.jurisdiction ?? ""}"`,
// //     `"${bid.bid_name ?? ""}"`,
// //     `"${formatDate(bid.open_date)}"`,
// //     `"${formatDate(bid.closing_date)}"`,
// //     `"${getCountdown(bid.closing_date)}"`,
// //     `"${typeof bid.status === "boolean" ? (bid.status ? "Active" : "Inactive") : bid.status}"`,
// //   ]);

// //   return [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
// // };

// // // Professional Shimmer Row Component
// // const ShimmerRow = ({ index }) => {
// //   const shimmerDelays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
// //   const animationDelay = `${shimmerDelays[index % shimmerDelays.length]}s`;

// //   return (
// //     <tr className="border-b border-white/10 hover:bg-white/5 transition">
// //       {/* Entity Type */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-5 w-24 rounded-lg mx-auto"
// //           style={{ animationDelay }}
// //         />
// //       </td>

// //       {/* Bid Name */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-5 w-48 rounded-lg mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.1}s` }}
// //         />
// //       </td>

// //       {/* Open Date */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-5 w-28 rounded-lg mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.15}s` }}
// //         />
// //       </td>

// //       {/* Closed Date */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-5 w-28 rounded-lg mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.25}s` }}
// //         />
// //       </td>

// //       {/* Countdown */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-6 w-20 rounded-full mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.3}s` }}
// //         />
// //       </td>

// //       {/* Status */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-6 w-16 rounded-full mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.35}s` }}
// //         />
// //       </td>

// //       {/* Share */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-8 w-8 rounded-full mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.4}s` }}
// //         />
// //       </td>

// //       {/* Follow */}
// //       <td className="px-4 py-4">
// //         <div 
// //           className="shimmer h-8 w-8 rounded-full mx-auto"
// //           style={{ animationDelay: `${parseFloat(animationDelay) + 0.45}s` }}
// //         />
// //       </td>
// //     </tr>
// //   );
// // };

// // // Enhanced Loading Container
// // const LoadingContainer = () => {
// //   return (
// //     <>
// //       {/* Header shimmer */}
// //       <tr className="bg-white/5 backdrop-blur-sm border-b border-white/20">
// //         {Array(8).fill(0).map((_, idx) => (
// //           <th key={idx} className="px-4 py-4">
// //             <div 
// //               className="shimmer h-4 w-20 rounded-lg mx-auto opacity-60"
// //               style={{ animationDelay: `${idx * 0.05}s` }}
// //             />
// //           </th>
// //         ))}
// //       </tr>

// //       {/* Body shimmer rows */}
// //       {Array(12).fill(0).map((_, idx) => (
// //         <ShimmerRow key={idx} index={idx} />
// //       ))}
// //     </>
// //   );
// // };

// // const BidTable = forwardRef(
// //   (
// //     {
// //       bids = [],
// //       totalCount = 0,
// //       currentSortField = "",
// //       currentSortOrder = "",
// //       onSort = () => { },
// //     },
// //     ref
// //   ) => {
// //     const navigate = useNavigate();
// //     const [data, setData] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);

// //     useEffect(() => {
// //   if (bids.length === 0) {
// //     setIsLoading(true);   // Show shimmer if no data
// //     setData([]);          // Clear data
// //   } else {
// //     setData([...bids]);   // Load data instantly
// //     setIsLoading(false);  // Hide shimmer
// //   }
// // }, [bids]);


// //     const handleRowClick = (id) => navigate(`/summary/${id}`);

// //     const exportToCSV = () => {
// //       const csv = convertToCSV(data);
// //       const blob = new Blob(["\uFEFF" + csv], {
// //         type: "text/csv;charset=utf-8;",
// //       });
// //       const url = URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
// //       link.href = url;
// //       link.setAttribute("download", `bids_export_${timestamp}.csv`);
// //       link.click();
// //       URL.revokeObjectURL(url);
// //     };

// //     useImperativeHandle(ref, () => ({
// //       exportToCSV,
// //     }));

// //     const truncate = (text) =>
// //       !text ? "-" : text.length > 30 ? text.slice(0, 30) + "..." : text;

// //     // Simple sort icon - keep same always, no change on click
// //     const getSortIcon = (field) => {
// //       const isCurrentField = currentSortField === field || currentSortField === `-${field}`;
// //       const isDescending = currentSortField === `-${field}`;

// //       if (!isCurrentField) {
// //         return <span className="ml-2"><i className="fas fa-sort text-white/50 text-xs"></i></span>;
// //       }

// //       return (
// //         <span className="ml-2">
// //           <i className={`fas ${isDescending ? 'fa-sort-down' : 'fa-sort-up'} text-white text-xs`}></i>
// //         </span>
// //       );
// //     };

// //     const handleHeaderClick = (field, e) => {
// //       e.stopPropagation(); // prevent row click
// //       onSort(field);
// //     };

// //     return (
// //       <>
// //         <style jsx>{`
// //           @keyframes shimmerFlow {
// //             0% { background-position: -200% 0; }
// //             100% { background-position: 200% 0; }
// //           }

// //           .shimmer {
// //             position: relative;
// //             overflow: hidden;
// //             background: linear-gradient(
// //               110deg,
// //               rgba(255, 255, 255, 0.03) 0%,
// //               rgba(255, 255, 255, 0.08) 25%,
// //               rgba(255, 255, 255, 0.15) 50%,
// //               rgba(255, 255, 255, 0.08) 75%,
// //               rgba(255, 255, 255, 0.03) 100%
// //             );
// //             background-color: rgba(255, 255, 255, 0.04);
// //             background-size: 200% 100%;
// //             animation: shimmerFlow 2s infinite ease-in-out;
// //             border-radius: 0.5rem;
// //           }

// //           .shimmer::after {
// //             content: '';
// //             position: absolute;
// //             top: 0;
// //             left: 0;
// //             right: 0;
// //             bottom: 0;
// //             background: linear-gradient(
// //               90deg,
// //               transparent 0%,
// //               rgba(255, 255, 255, 0.1) 50%,
// //               transparent 100%
// //             );
// //             transform: translateX(-100%);
// //             animation: shimmerSlide 2s infinite ease-in-out;
// //           }

// //           @keyframes shimmerSlide {
// //             0% { transform: translateX(-100%); }
// //             100% { transform: translateX(100%); }
// //           }
// //         `}</style>

// //         <div className="bid-table rounded-2xl bg-btn text-white my-[50px] shadow-xl overflow-x-auto border-white border-2 border-solid relative max-h-screen overflow-y-auto">
// //           <table className="min-w-full table-auto text-sm text-center">
// //             {isLoading ? (
// //               <thead className="sticky top-0 bg-white/5 backdrop-blur-sm">
// //                 <LoadingContainer />
// //               </thead>
// //             ) : (
// //               <>
// //                 <thead className="sticky top-0 bg-white/5 backdrop-blur-sm">
// //                   <tr className="text-white/80 text-xs border-b border-white/20">
// //                     <th className="px-4 py-4 font-inter text-lg">Entity Type</th>

// //                     {/* Sortable headers with simple up/down icons */}
// //                     <th
// //                       className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
// //                       onClick={(e) => handleHeaderClick("bid_name", e)}
// //                     >
// //                       Bid Name {getSortIcon("bid_name")}
// //                     </th>

// //                     <th
// //                       className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
// //                       onClick={(e) => handleHeaderClick("open_date", e)}
// //                     >
// //                       Open Date {getSortIcon("open_date")}
// //                     </th>

// //                     <th
// //                       className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
// //                       onClick={(e) => handleHeaderClick("closing_date", e)}
// //                     >
// //                       Closed Date {getSortIcon("closing_date")}
// //                     </th>

// //                     {/* Countdown uses closing_date for sorting */}
// //                     <th
// //                       className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/10 transition-colors select-none"
// //                       onClick={(e) => handleHeaderClick("closing_date", e)}
// //                       title="Sorted by closing date"
// //                     >
// //                       Countdown {getSortIcon("closing_date")}
// //                     </th>

// //                     <th className="px-4 py-4 font-inter text-lg">Status</th>
// //                     <th className="px-4 py-4 font-inter text-lg text-center">Share</th>
// //                     <th className="px-4 py-4 font-inter text-lg text-center">Follow</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>
// //                   {data.length === 0 ? (
// //                     <tr>
// //                       <td colSpan="8" className="px-4 py-8 text-center text-white/60">
// //                         <div className="flex flex-col items-center space-y-3">
// //                           <i className="fas fa-inbox text-4xl text-white/30"></i>
// //                           <p className="text-lg">No bids found</p>
// //                           <p className="text-sm text-white/40">Try adjusting your search criteria</p>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ) : (
// //                     data.map((bid) => {
// //                       const statusLabel = bid.bid_type || "Unknown";
// //                       const countdownRaw = getCountdown(bid.closing_date);
// //                       let countdownDisplay = countdownRaw;

// //                       // 🔥 NEW LOGIC: If bid_type is 'Inactive', always show 'Closed'
// //                       if (statusLabel.toLowerCase() === 'inactive') {
// //                         countdownDisplay = "Closed";
// //                       }
// //                       // Enhanced logic to handle closed bids and prioritize soon-to-close bids
// //                       else if (bid.status === false || statusLabel.toLowerCase() === 'closed') {
// //                         countdownDisplay = "Closed";
// //                       } else if (countdownRaw === "Closed") {
// //                         countdownDisplay = "Closed";
// //                       } else if (!["-", "Closed", "Closes today"].includes(countdownRaw)) {
// //                         const days = parseInt(countdownRaw.match(/\d+/)?.[0] || "0", 10);

// //                         if (days <= 0) {
// //                           countdownDisplay = "Closed";
// //                         } else if (days === 1) {
// //                           countdownDisplay = "Today";
// //                         } else if (days < 30) {
// //                           countdownDisplay = `${days} days`;
// //                         } else if (days < 365) {
// //                           const months = Math.floor(days / 30);
// //                           const remainingDays = days % 30;
// //                           if (remainingDays === 0) {
// //                             countdownDisplay = `${months}m`;
// //                           } else {
// //                             countdownDisplay = `${months}mo ${remainingDays}d`;
// //                           }
// //                         } else {
// //                           const years = Math.floor(days / 365);
// //                           const months = Math.floor((days % 365) / 30);
// //                           const remainingDays = (days % 365) % 30;

// //                           const parts = [];
// //                           if (years > 0) parts.push(`${years}y`);
// //                           if (months > 0) parts.push(`${months}m`);
// //                           if (years === 0 && remainingDays > 0) parts.push(`${remainingDays}d`);

// //                           countdownDisplay = parts.join(" ");
// //                         }
// //                       }

// //                       return (
// //                         <tr
// //                           key={bid.id}
// //                           className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
// //                           onClick={() => handleRowClick(bid.id)}
// //                         >
// //                           <td className="px-4 py-4 font-semibold font-inter">{truncate(bid.entity_type)}</td>
// //                           <td className="px-4 py-4 font-medium font-inter">{truncate(bid.bid_name)}</td>
// //                           <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
// //                           <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
// //                           <td className="px-4 py-4 font-medium font-inter" title={countdownRaw}>
// //                             <span className="text-white">
// //                               {countdownDisplay}
// //                             </span>
// //                           </td>
// //                           <td className="px-4 py-4 font-medium font-inter">{statusLabel}</td>
// //                           <td className="btn-box px-4 py-4 text-center">
// //                             <button
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 if (navigator.share) {
// //                                   navigator
// //                                     .share({
// //                                       title: `Bid: ${bid.bid_name}`,
// //                                       text: `Check out this bid from ${bid.jurisdiction}`,
// //                                       url: `${window.location.origin}/summary/${bid.id}`,
// //                                     })
// //                                     .then(() => console.log("Shared successfully!"))
// //                                     .catch((err) => console.error("Share failed:", err));
// //                                 } else {
// //                                   alert("Sharing is not supported on this device.");
// //                                 }
// //                               }}
// //                             >
// //                               <i className="fas fa-share-alt"></i>
// //                             </button>
// //                           </td>
// //                           <td className="px-4 py-4 text-center">
// //                             <button>
// //                               <i
// //                                 className={`fas ${bid.followed ? "fa-minus-circle" : "fa-plus-circle"
// //                                   }`}
// //                               ></i>
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })
// //                   )}
// //                 </tbody>
// //               </>
// //             )}
// //           </table>
// //         </div>
// //       </>
// //     );
// //   }
// // );

// // export default BidTable;

















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
  if (diffInDays === 1) return "1 day";
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
      onSort = () => { },
    },
    ref
  ) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {

      setData([...bids]);
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
    // Replace getSortIcon function:
    const getSortIcon = (field) => {
      const isCurrentField = currentSortField === field || currentSortField === `-${field}`;
      const isDescending = currentSortField === `-${field}`;

      if (!isCurrentField) {
        return <span className="ml-2"><i className="fas fa-sort text-white/50 text-xs"></i></span>;
      }

      return (
        <span className="ml-2">
          <i className={`fas ${isDescending ? 'fa-sort-down' : 'fa-sort-up'} text-white text-xs`}></i>
        </span>
      );
    };

    const handleHeaderClick = (field, e) => {
      e.stopPropagation(); // prevent row click
      // console.log(`🔥 Sorting by field: ${field}`);
      onSort(field);
    };

    // Debug logging
    // console.log('🔥 BidTable currentSortField:', currentSortField);
    // console.log('🔥 BidTable data count:', data.length);

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

                const closingDateObj = new Date(bid.closing_date);
                const today = new Date();

                const isClosingToday =
                  closingDateObj.getDate() === today.getDate() &&
                  closingDateObj.getMonth() === today.getMonth() &&
                  closingDateObj.getFullYear() === today.getFullYear();

                if (statusLabel.toLowerCase() === 'inactive' || bid.status === false || statusLabel.toLowerCase() === 'closed') {
                  countdownDisplay = "Closed";
                } else if (isClosingToday) {
                  countdownDisplay = "Today";
                } else if (countdownRaw === "Closed") {
                  countdownDisplay = "Closed";
                } else if (!["-", "Closed"].includes(countdownRaw)) {
                  const days = parseInt(countdownRaw.match(/\d+/)?.[0] || "0", 10);

                  if (days <= 0) {
                    countdownDisplay = "Closed";
                  } else if (days < 30) {
                    countdownDisplay = `${days} days`;
                  } else if (days < 365) {
                    const months = Math.floor(days / 30);
                    const remainingDays = days % 30;
                    countdownDisplay = remainingDays === 0 ? `${months}m` : `${months}mo ${remainingDays}d`;
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
                          className={`fas ${bid.followed ? "fa-minus-circle" : "fa-plus-circle"
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