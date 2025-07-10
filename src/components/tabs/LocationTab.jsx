// import React, { useState } from "react";
// import { Trash2, Search } from "lucide-react";

// const mockData = [
//   {
//     name: "California",
//     children: [
//       { name: "Los Angeles" },
//       { name: "San Francisco" },
//       { name: "San Diego" },
//     ],
//   },
//   {
//     name: "Texas",
//     children: [
//       { name: "Houston" },
//       { name: "Austin" },
//       { name: "Dallas" },
//     ],
//   },
//   {
//     name: "New York",
//     children: [
//       { name: "New York City" },
//       { name: "Buffalo" },
//       { name: "Rochester" },
//     ],
//   },
//   {
//     name: "Florida",
//     children: [
//       { name: "Miami" },
//       { name: "Orlando" },
//       { name: "Tampa" },
//     ],
//   },
//   {
//     name: "Illinois",
//     children: [
//       { name: "Chicago" },
//       { name: "Springfield" },
//       { name: "Peoria" },
//     ],
//   },
//   {
//     name: "Georgia",
//     children: [
//       { name: "Atlanta" },
//       { name: "Savannah" },
//       { name: "Augusta" },
//     ],
//   },
//   {
//     name: "Arizona",
//     children: [
//       { name: "Phoenix" },
//       { name: "Tucson" },
//       { name: "Scottsdale" },
//     ],
//   },
//   {
//     name: "Washington",
//     children: [
//       { name: "Seattle" },
//       { name: "Spokane" },
//       { name: "Tacoma" },
//     ],
//   },
//   {
//     name: "North Carolina",
//     children: [
//       { name: "Charlotte" },
//       { name: "Raleigh" },
//       { name: "Durham" },
//     ],
//   },
//   {
//     name: "Colorado",
//     children: [
//       { name: "Denver" },
//       { name: "Boulder" },
//       { name: "Colorado Springs" },
//     ],
//   },
// ];

// const LocationTab = () => {
//   const [selected, setSelected] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   const toggleSelect = (item) => {
//     setSelected((prev) => {
//       const exists = prev.find((s) => s.name === item.name);
//       if (exists) {
//         return prev.filter((s) => s.name !== item.name);
//       } else {
//         return [...prev, item];
//       }
//     });
//   };

//   const removeSelected = (name) => {
//     setSelected((prev) => prev.filter((item) => item.name !== name));
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between p-10 ps-14">
//       {/* Search bar */}
//       <div className="flex justify-end mb-8">
//         <div className="relative w-[340px]">
//           <input
//             type="text"
//             placeholder="Search titles or organization or location"
//             className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
//           />
//           <Search
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
//             size={18}
//           />
//         </div>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-p font-medium ">
//           Selected Cities <span className="text-primary">({selected.length})</span>
//         </h2>
//         {selected.length > 0 && (
//           <button
//             onClick={() => setSelected([])}
//             className="text-lg underline font-inter"
//           >
//             Clear All
//           </button>
//         )}
//       </div>
//       <div className="flex flex-wrap gap-4">
//         {selected.map((item) => (
//           <div
//             key={item.name}
//             className="flex border-[2px] gap-3 px-5 rounded-[30px] border-primary items-center justify-between text-lg py-2  font-inter"
//           >
//             <div className="font">
//               <div>{item.name}</div>
//             </div>
//             <button
//               onClick={() => removeSelected(item.name)}
//               className="text-primary "
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         ))}
//       </div>


//       <div className="border-[#273BE280] border-[2px] rounded-[10px] mt-6">
//         <div className="font-semibold text-md p-2 border-b">States</div>
//         {mockData.map((cat) => (
//           <div key={cat.name}>
//             <button
//               onClick={() =>
//                 setActiveCategory((prev) => (prev === cat.name ? null : cat.name))
//               }
//               className="flex font-inter text-xl w-full px-4 py-3 border-[#273BE280] border-t-[2px]"
//             >
//               <div className="text-primary w-6">
//                 {cat.children ? <i class="far fa-chevron-right"></i> : ""}
//               </div>
//               <div className="font-medium">{cat.name}</div>
//             </button>
//             {activeCategory === cat.name && cat.children && (
//               <div className="">
//                 {cat.children.map((child) => (
//                   <label
//                     key={child.name}
//                     className="flex items-center gap-5 py-2 cursor-pointer font-inter px-8 text-xl border-[#273BE280] border-t-[2px]"
//                   >
//                     <input
//                       type="checkbox"
//                       className="mt-1 accent-primary"
//                       checked={selected.some((item) => item.name === child.name)}
//                       onChange={() => toggleSelect(child)}
//                     />
//                     <div className="text-[16px]">{child.name}</div>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
//         <button className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all">
//           Cancel
//         </button>
//         <button className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all">
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LocationTab;













import React, { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";
import api from "../../utils/axios";

const LocationTab = ({ filters, setFilters, onApply }) => {
  const [statesData, setStatesData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isPrefilled, setIsPrefilled] = useState(false);

  useEffect(() => {
    setIsPrefilled(false);
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await api.get("/auth/states/");
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setStatesData(sorted);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (!isPrefilled && filters.location && statesData.length > 0) {
      const names = filters.location.split(",").map((name) => name.trim());
      const matched = statesData.filter((state) => names.includes(state.name));
      setSelected(matched);
      setIsPrefilled(true);
    }
  }, [filters.location, statesData, isPrefilled]);

  const toggleSelect = (state) => {
    setSelected((prev) =>
      prev.find((item) => item.name === state.name)
        ? prev.filter((item) => item.name !== state.name)
        : [...prev, state]
    );
  };

  const handleApply = () => {
    const locationString = selected.map((item) => item.name).join(",");
    setFilters((prev) => ({ ...prev, location: locationString }));
    onApply();
  };

  const handleCancel = () => {
    setSelected([]);
    setFilters((prev) => ({ ...prev, location: "" }));
    onApply();
  };

  const removeSelected = (name) => {
    setSelected((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-10 ps-14">
      <div className="flex justify-end mb-8">
        <div className="relative w-[340px]">
          <input
            type="text"
            placeholder="Search titles or organization or location"
            className="w-full px-10 py-2 rounded-full border border-primary outline-none placeholder-gray-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
        </div>
      </div>

      {/* Selected */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-p font-medium">
          Selected States <span className="text-primary">({selected.length})</span>
        </h2>
        {selected.length > 0 && (
          <button onClick={() => setSelected([])} className="text-lg underline font-inter">
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {selected.map((item) => (
          <div
            key={item.name}
            className="flex border-[2px] gap-3 px-5 rounded-[30px] border-primary items-center justify-between text-lg py-2 font-inter"
          >
            <div>{item.name}</div>
            <button onClick={() => removeSelected(item.name)} className="text-primary">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* States List */}
      <div className="border-[#273BE280] border-[2px] rounded-[10px] mt-6">
        <div className="font-semibold text-md p-2 border-b">States</div>
        {statesData.map((state) => (
          <label
            key={state.name}
            className="flex items-center gap-5 py-2 cursor-pointer font-inter px-4 text-xl border-[#273BE280] border-t-[2px]"
          >
            <input
              type="checkbox"
              className="mt-1 accent-primary"
              checked={selected.some((item) => item.name === state.name)}
              onChange={() => toggleSelect(state)}
            />
            <div className="text-[16px]">{state.name}</div>
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 p-5 ps-0 bg-white sticky bottom-0">
        <button
          onClick={handleCancel}
          className="border-[2px] px-10 py-3 rounded-[20px] font-archivo text-xl transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="bg-primary text-white px-10 py-3 rounded-[20px] font-archivo text-xl hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default LocationTab;
