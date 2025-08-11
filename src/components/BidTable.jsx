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












// ✅ Updated `BidTable` with Enhanced Entity Type Dropdown UI

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef
} from "react";
import { useNavigate } from "react-router-dom";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
}

function getCountdown(closingDateStr) {
  if (!closingDateStr) return "-";
  const closingDate = new Date(closingDateStr);
  const now = new Date();
  const diffInMs = closingDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (isNaN(diffInDays)) return "-";
  if (diffInDays < 0) return "Closed";
  if (diffInDays === 1) return "1 day";
  return `${diffInDays} days`;
}

const convertToCSV = (rows) => {
  if (!rows?.length) return "";

  const headers = ["Jurisdiction", "Bid Name", "Open Date", "Closed Date", "Countdown", "Status"];

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

const BidTable = forwardRef(({ bids = [], totalCount = 0, currentSortField = "", currentSortOrder = "", onSort = () => { }, onEntityTypeChange = () => { } }, ref) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("Select Entity");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setData([...bids]);
  }, [bids]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRowClick = (id) => navigate(`/summary/${id}`);

  const exportToCSV = () => {
    const csv = convertToCSV(data);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    link.href = url;
    link.setAttribute("download", `bids_export_${timestamp}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  useImperativeHandle(ref, () => ({ exportToCSV }));

  const truncate = (text) => !text ? "-" : text.length > 30 ? text.slice(0, 30) + "..." : text;

  const getSortIcon = (field) => {
    const isCurrentField = currentSortField === field || currentSortField === `-${field}`;
    const isDescending = currentSortField === `-${field}`;
    if (!isCurrentField) return <span className="ml-2"><i className="fas fa-sort text-white/50 text-xs"></i></span>;
    return <span className="ml-2"><i className={`fas ${isDescending ? 'fa-sort-down' : 'fa-sort-up'} text-white text-xs`}></i></span>;
  };

  const handleHeaderClick = (field, e) => {
    e.stopPropagation();
    onSort(field);
  };

  const handleEntityTypeClick = (type) => {
    setSelectedEntity(type);
    onEntityTypeChange(type === "Select Entity" ? "" : type);
    setDropdownOpen(false);
  };

  return (
    <div className="bid-table rounded-2xl bg-btn text-white my-[50px] shadow-xl overflow-x-auto border-white border-2 border-solid relative max-h-screen overflow-y-auto">
      <table className="min-w-full table-auto text-sm text-center">
        <thead className="sticky top-0 bg-white/5 backdrop-blur-sm">
          <tr className="text-white/80 text-xs border-b border-white/20">

            <th className="px-4 py-4 font-inter text-lg relative">
              <div ref={dropdownRef} className="inline-block text-left">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2  px-3 py-1 rounded-full"
                >
                  {selectedEntity} <i className="fas fa-caret-down text-sm"></i>
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-40 rounded-md bg-white text-black font-medium z-10">
                    {["Select Entity", "Federal", "State", "Local"].map((type) => (
                      <div
                        key={type}
                        onClick={() => handleEntityTypeClick(type)}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedEntity === type ? 'bg-gray-100 font-semibold' : ''}`}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </th>

            <th className="px-4 py-4 font-inter text-lg cursor-pointer" onClick={(e) => handleHeaderClick("bid_name", e)}>Bid Name {getSortIcon("bid_name")}</th>
            <th className="px-4 py-4 font-inter text-lg cursor-pointer" onClick={(e) => handleHeaderClick("open_date", e)}>Open Date {getSortIcon("open_date")}</th>
            <th className="px-4 py-4 font-inter text-lg cursor-pointer" onClick={(e) => handleHeaderClick("closing_date", e)}>Closed Date {getSortIcon("closing_date")}</th>
            <th className="px-4 py-4 font-inter text-lg cursor-pointer" onClick={(e) => handleHeaderClick("closing_date", e)} title="Sorted by closing date">Countdown {getSortIcon("closing_date")}</th>
            <th className="px-4 py-4 font-inter text-lg">Status</th>
            <th className="px-4 py-4 font-inter text-lg text-center">Share</th>
            <th className="px-4 py-4 font-inter text-lg text-center">Follow</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-inbox text-2xl text-white/50"></i>
                  </div>
                  <div>
                    <p className="text-white/60 text-lg font-medium">No bids found</p>
                    <p className="text-white/40 text-sm mt-1">
                      {selectedEntity && selectedEntity !== "Select Entity"
                        ? `No bids available for ${selectedEntity} entity type`
                        : 'Try adjusting your filters'}
                    </p>

                  </div>
                </div>
              </td>
            </tr>
          ) : (
            data.map((bid) => {
              const statusLabel = bid.bid_type || "Unknown";
              const countdownRaw = getCountdown(bid.closing_date);
              let countdownDisplay = countdownRaw;

              const closingDateObj = new Date(bid.closing_date);
              const today = new Date();
              const isClosingToday = closingDateObj.toDateString() === today.toDateString();

              if (statusLabel.toLowerCase() === 'inactive' || bid.status === false || statusLabel.toLowerCase() === 'closed') {
                countdownDisplay = "Closed";
              } else if (isClosingToday) {
                countdownDisplay = "Today";
              } else if (!["-", "Closed"].includes(countdownRaw)) {
                const days = parseInt(countdownRaw.match(/\d+/)?.[0] || "0", 10);
                if (days <= 0) countdownDisplay = "Closed";
                else if (days < 30) countdownDisplay = `${days} days`;
                else if (days < 365) {
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
                <tr key={bid.id} className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer" onClick={() => handleRowClick(bid.id)}>
                  <td className="px-4 py-4 font-semibold font-inter">{truncate(bid.entity_type)}</td>
                  <td className="px-4 py-4 font-medium font-inter">{truncate(bid.bid_name)}</td>
                  <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
                  <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
                  <td className="px-4 py-4 font-medium font-inter" title={countdownRaw}><span className="text-white">{countdownDisplay}</span></td>
                  <td className="px-4 py-4 font-medium font-inter">{statusLabel}</td>
                  <td className="btn-box px-4 py-4 text-center">
                    <button onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({
                          title: `Bid: ${bid.bid_name}`,
                          text: `Check out this bid from ${bid.jurisdiction}`,
                          url: `${window.location.origin}/summary/${bid.id}`,
                        }).catch((err) => console.error("Share failed:", err));
                      } else {
                        alert("Sharing is not supported on this device.");
                      }
                    }}>
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
            })
          )}
        </tbody>
      </table>
    </div>
  );
});

export default BidTable;

















// import React, {
//   useEffect,
//   useState,
//   useImperativeHandle,
//   forwardRef,
//   useRef
// } from "react";
// import { useNavigate } from "react-router-dom";

// function formatDate(dateStr) {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   return date.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
// }

// function getCountdown(closingDateStr) {
//   if (!closingDateStr) return "-";
//   const closingDate = new Date(closingDateStr);
//   const now = new Date();
//   const diffInMs = closingDate.getTime() - now.getTime();
//   const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

//   if (isNaN(diffInDays)) return "-";
//   if (diffInDays < 0) return "Closed";
//   if (diffInDays === 1) return "1 day";
//   return `${diffInDays} days`;
// }

// const convertToCSV = (rows) => {
//   if (!rows?.length) return "";

//   const headers = ["Jurisdiction", "Bid Name", "Open Date", "Closed Date", "Countdown", "Status"];

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

// const BidTable = forwardRef(({
//   bids = [],
//   totalCount = 0,
//   currentSortField = "",
//   currentSortOrder = "",
//   onSort = () => {},
//   onEntityTypeChange = () => {},
//   selectedEntityType = null
// }, ref) => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const entityTypes = [
//     { label: "Select Entity Type", value: null, isDefault: true },
//     { label: "Federal", value: "Federal" },
//     { label: "State", value: "State" },
//     { label: "Local", value: "Local" }
//   ];

//   useEffect(() => {
//     setData([...bids]);
//   }, [bids]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleRowClick = (id) => navigate(`/summary/${id}`);

//   const exportToCSV = () => {
//     const csv = convertToCSV(data);
//     const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
//     link.href = url;
//     link.setAttribute("download", `bids_export_${timestamp}.csv`);
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   useImperativeHandle(ref, () => ({ exportToCSV }));

//   const truncate = (text) => !text ? "-" : text.length > 30 ? text.slice(0, 30) + "..." : text;

//   const getSortIcon = (field) => {
//     const isCurrentField = currentSortField === field || currentSortField === `-${field}`;
//     const isDescending = currentSortField === `-${field}`;
//     if (!isCurrentField) return <span className="ml-2"><i className="fas fa-sort text-white/50 text-xs"></i></span>;
//     return <span className="ml-2"><i className={`fas ${isDescending ? 'fa-sort-down' : 'fa-sort-up'} text-white text-xs`}></i></span>;
//   };

//   const handleHeaderClick = (field, e) => {
//     e.stopPropagation();
//     onSort(field);
//   };

//   const handleEntityTypeClick = (type) => {
//     onEntityTypeChange(type);
//     setDropdownOpen(false);
//   };

//   const getDisplayLabel = () => {
//     const selected = entityTypes.find(type => type.value === selectedEntityType);
//     return selected ? selected.label : "Select Entity Type";
//   };

//   const getFilterIcon = () => {
//     return selectedEntityType ? (
//       <i className="fas fa-filter text-sm text-blue-300"></i>
//     ) : (
//       <i className="fas fa-caret-down text-sm"></i>
//     );
//   };

//   return (
//     <div className="bid-table rounded-2xl bg-btn text-white my-[50px] shadow-xl overflow-x-auto border-white border-2 border-solid relative max-h-screen overflow-y-auto">
//       <table className="min-w-full table-auto text-sm text-center">
//         <thead className="sticky top-0 bg-white/5 backdrop-blur-sm">
//           <tr className="text-white/80 text-xs border-b border-white/20">
//             <th className="px-4 py-4 font-inter text-lg relative">
//               <div ref={dropdownRef} className="inline-block text-left">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
//                     selectedEntityType ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-white/5'
//                   }`}
//                 >
//                   <span className={selectedEntityType ? 'text-blue-300' : 'text-white/90'}>
//                     {getDisplayLabel()}
//                   </span>
//                   {getFilterIcon()}
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute mt-2 w-48 rounded-xl shadow-2xl bg-white/95 backdrop-blur-md text-black z-20 border border-white/20 overflow-hidden">
//                     {entityTypes.map((type, index) => (
//                       <div
//                         key={type.value || 'default'}
//                         onClick={() => handleEntityTypeClick(type.value)}
//                         className={`px-4 py-3 cursor-pointer transition-all duration-200 flex items-center justify-between ${
//                           type.isDefault
//                             ? 'bg-gray-50 border-b border-gray-200 text-gray-600 hover:bg-gray-100'
//                             : 'hover:bg-blue-50 text-gray-800'
//                         } ${
//                           selectedEntityType === type.value
//                             ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
//                             : ''
//                         }`}
//                       >
//                         <span className={`font-medium ${type.isDefault ? 'italic' : ''}`}>
//                           {type.label}
//                         </span>
//                         {selectedEntityType === type.value && !type.isDefault && (
//                           <i className="fas fa-check text-blue-500 text-sm"></i>
//                         )}
//                         {type.isDefault && (
//                           <i className="fas fa-list text-gray-400 text-sm"></i>
//                         )}
//                       </div>
//                     ))}

//                     {selectedEntityType && (
//                       <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
//                         <button
//                           onClick={() => handleEntityTypeClick(null)}
//                           className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-2 transition-colors"
//                         >
//                           <i className="fas fa-times text-xs"></i>
//                           Clear Filter
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Filter indicator */}
//               {selectedEntityType && (
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div>
//               )}
//             </th>

//             <th className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/5 rounded-lg transition-colors" onClick={(e) => handleHeaderClick("bid_name", e)}>
//               Bid Name {getSortIcon("bid_name")}
//             </th>
//             <th className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/5 rounded-lg transition-colors" onClick={(e) => handleHeaderClick("open_date", e)}>
//               Open Date {getSortIcon("open_date")}
//             </th>
//             <th className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/5 rounded-lg transition-colors" onClick={(e) => handleHeaderClick("closing_date", e)}>
//               Closed Date {getSortIcon("closing_date")}
//             </th>
//             <th className="px-4 py-4 font-inter text-lg cursor-pointer hover:bg-white/5 rounded-lg transition-colors" onClick={(e) => handleHeaderClick("closing_date", e)} title="Sorted by closing date">
//               Countdown {getSortIcon("closing_date")}
//             </th>
//             <th className="px-4 py-4 font-inter text-lg">Status</th>
//             <th className="px-4 py-4 font-inter text-lg text-center">Share</th>
//             <th className="px-4 py-4 font-inter text-lg text-center">Follow</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="px-4 py-12 text-center">
//                 <div className="flex flex-col items-center justify-center space-y-4">
//                   <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
//                     <i className="fas fa-inbox text-2xl text-white/50"></i>
//                   </div>
//                   <div>
//                     <p className="text-white/60 text-lg font-medium">No bids found</p>
//                     <p className="text-white/40 text-sm mt-1">
//                       {selectedEntityType ? `No bids available for ${selectedEntityType} entity type` : 'Try adjusting your filters'}
//                     </p>
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           ) : (
//             data.map((bid) => {
//               const statusLabel = bid.bid_type || "Unknown";
//               const countdownRaw = getCountdown(bid.closing_date);
//               let countdownDisplay = countdownRaw;

//               const closingDateObj = new Date(bid.closing_date);
//               const today = new Date();
//               const isClosingToday = closingDateObj.toDateString() === today.toDateString();

//               if (statusLabel.toLowerCase() === 'inactive' || bid.status === false || statusLabel.toLowerCase() === 'closed') {
//                 countdownDisplay = "Closed";
//               } else if (isClosingToday) {
//                 countdownDisplay = "Today";
//               } else if (!["-", "Closed"].includes(countdownRaw)) {
//                 const days = parseInt(countdownRaw.match(/\d+/)?.[0] || "0", 10);
//                 if (days <= 0) countdownDisplay = "Closed";
//                 else if (days < 30) countdownDisplay = `${days} days`;
//                 else if (days < 365) {
//                   const months = Math.floor(days / 30);
//                   const remainingDays = days % 30;
//                   countdownDisplay = remainingDays === 0 ? `${months}m` : `${months}mo ${remainingDays}d`;
//                 } else {
//                   const years = Math.floor(days / 365);
//                   const months = Math.floor((days % 365) / 30);
//                   const remainingDays = (days % 365) % 30;
//                   const parts = [];
//                   if (years > 0) parts.push(`${years}y`);
//                   if (months > 0) parts.push(`${months}m`);
//                   if (years === 0 && remainingDays > 0) parts.push(`${remainingDays}d`);
//                   countdownDisplay = parts.join(" ");
//                 }
//               }

//               return (
//                 <tr key={bid.id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-200 cursor-pointer group" onClick={() => handleRowClick(bid.id)}>
//                   <td className="px-4 py-4 font-semibold font-inter">
//                     <span className="inline-flex items-center gap-2">
//                       {truncate(bid.entity_type)}
//                       {selectedEntityType === bid.entity_type && (
//                         <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
//                       )}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4 font-medium font-inter group-hover:text-blue-200 transition-colors">{truncate(bid.bid_name)}</td>
//                   <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.open_date)}</td>
//                   <td className="px-4 py-4 font-medium font-inter">{formatDate(bid.closing_date)}</td>
//                   <td className="px-4 py-4 font-medium font-inter" title={countdownRaw}>
//                     <span className="text-white">{countdownDisplay}</span>
//                   </td>
//                   <td className="px-4 py-4 font-medium font-inter">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       statusLabel.toLowerCase() === 'active' ? 'bg-green-500/20 text-green-300' :
//                       statusLabel.toLowerCase() === 'inactive' ? 'bg-red-500/20 text-red-300' :
//                       'bg-yellow-500/20 text-yellow-300'
//                     }`}>
//                       {statusLabel}
//                     </span>
//                   </td>
//                   <td className="btn-box px-4 py-4 text-center">
//                     <button
//                       className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         if (navigator.share) {
//                           navigator.share({
//                             title: `Bid: ${bid.bid_name}`,
//                             text: `Check out this bid from ${bid.jurisdiction}`,
//                             url: `${window.location.origin}/summary/${bid.id}`,
//                           }).catch((err) => console.error("Share failed:", err));
//                         } else {
//                           alert("Sharing is not supported on this device.");
//                         }
//                       }}
//                     >
//                       <i className="fas fa-share-alt hover:text-blue-300 transition-colors"></i>
//                     </button>
//                   </td>
//                   <td className="px-4 py-4 text-center">
//                     <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110">
//                       <i className={`fas ${bid.followed ? "fa-minus-circle text-red-300 hover:text-red-400" : "fa-plus-circle text-green-300 hover:text-green-400"} transition-colors`}></i>
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// export default BidTable;