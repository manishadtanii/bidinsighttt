// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheck,
//   faXmark,
//   faCalendarAlt,
//   faUsers,
//   faHandshake,
//   faMapMarkerAlt,
//   faChevronDown
// } from "@fortawesome/free-solid-svg-icons";

// function FormSelect({
//   label,
//   name,
//   options = [],
//   placeholder = "Select an option",
//   required = true,
//   value = "",
//   onChange,
//   onBlur,
//   message = "",
//   messageType = "",
//   touched = false
// }) {
//   const dropdownRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Sort options alphabetically A-Z
//   const sortedOptions = [...options].sort((a, b) => 
//     a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
//   );
  
//   const fullOptions = [
//     { value: "", label: placeholder },
//     ...sortedOptions.filter((opt) => opt.value !== "")
//   ];

//   // Filter options based on search term
//   const filteredOptions = fullOptions.filter(option =>
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const [selected, setSelected] = useState(value || "");
//   const isSuccess = messageType === "success";

//   const getIcon = (text) => {
//     const lower = text.toLowerCase();
//     if (lower.includes("year")) return faCalendarAlt;
//     if (lower.includes("employee")) return faUsers;
//     if (lower.includes("contract")) return faHandshake;
//     if (lower.includes("state")) return faMapMarkerAlt;
//     return null;
//   };

//   const iconColor = (text) => {
//     const lower = text.toLowerCase();
//     if (lower.includes("state")) return "text-[#9CA3AF]";
//     return "text-gray-400";
//   };

//   // Close dropdown when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSearchTerm("");
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Update parent on change - SAME AS BEFORE
//   useEffect(() => {
//     if (onChange) {
//       onChange({ target: { name, value: selected } });
//     }
//   }, [selected]);

//   const handleSelect = (optValue) => {
//     setSelected(optValue);
//     setIsOpen(false);
//     setSearchTerm("");
    
//     // Call onBlur if provided
//     if (onBlur) {
//       onBlur({ target: { name, value: optValue } });
//     }
//   };

//   return (
//     <div
//       className="form-field flex flex-col mb-3 w-[100%] md:w-[90%]"
//       ref={dropdownRef}
//     >
//       {/* Label */}
//       <label className="form-label font-t mb-2" htmlFor={name}>
//         {label}
//       </label>

//       {/* Custom Dropdown */}
//       <div
//         className="relative font-t p-3 py-5 rounded-[20px] border border-gray-300 text-white cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <FontAwesomeIcon
//               icon={getIcon(label)}
//               className={`${iconColor(label)}`}
//             />
//             <span>
//               {fullOptions.find((o) => o.value === selected)?.label || placeholder}
//             </span>
//           </div>
//           <FontAwesomeIcon
//             icon={faChevronDown}
//             className={`text-gray-400 transform transition-transform ${
//               isOpen ? "rotate-180" : "rotate-0"
//             }`}
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute left-0 top-full mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
//             {/* Search Input - Only for State dropdown (more than 10 options) */}
//             {options.length > 10 && (
//               <div className="p-3 border-b border-gray-200">
//                 <input
//                   type="text"
//                   placeholder="Search states..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//               </div>
//             )}
            
//             {/* Options List with scrolling */}
//             <ul className="max-h-48 overflow-y-auto">
//               {filteredOptions.map((opt, i) => (
//                 <li
//                   key={i}
//                   className={`flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer ${
//                     opt.value === "" ? "text-gray-400" : ""
//                   } ${opt.value === selected ? "bg-blue-50" : ""}`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleSelect(opt.value);
//                   }}
//                 >
//                   <FontAwesomeIcon
//                     icon={getIcon(label)}
//                     className={`${iconColor(label)} text-xs`}
//                   />
//                   {opt.label}
//                 </li>
//               ))}
//               {filteredOptions.length === 0 && (
//                 <li className="p-3 text-gray-500 text-center">
//                   No options found
//                 </li>
//               )}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Validation Message - Only show when touched is true */}
//       {touched && message && (
//         <p
//           className={`text-sm flex items-center gap-1 mt-0.5 mb-1 ${
//             isSuccess ? "text-green-400" : "text-red-400"
//           }`}
//         >
//           <FontAwesomeIcon
//             icon={isSuccess ? faCheck : faXmark}
//             className={isSuccess ? "text-green-400" : "text-red-400"}
//           />
//           <span>{message}</span>
//         </p>
//       )}
//     </div>
//   );
// }

// export default FormSelect;









import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faCalendarAlt,
  faUsers,
  faHandshake,
  faMapMarkerAlt,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

function FormSelect({
  label,
  name,
  options = [],
  placeholder = "Select an option",
  required = true,
  value = "",
  onChange,
  onBlur,
  message = "",
  messageType = "",
  touched = false // This prop is not needed anymore in validation logic
}) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sort options alphabetically A-Z
  const sortedOptions = [...options].sort((a, b) => 
    a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
  );
  
  const fullOptions = [
    { value: "", label: placeholder },
    ...sortedOptions.filter((opt) => opt.value !== "")
  ];

  // Filter options based on search term
  const filteredOptions = fullOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selected, setSelected] = useState(value || "");
  const isSuccess = messageType === "success";

  const getIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("year")) return faCalendarAlt;
    if (lower.includes("employee")) return faUsers;
    if (lower.includes("contract")) return faHandshake;
    if (lower.includes("state")) return faMapMarkerAlt;
    return null;
  };

  const iconColor = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("state")) return "text-[#9CA3AF]";
    return "text-gray-400";
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update parent on change
  useEffect(() => {
    if (onChange) {
      onChange({ target: { name, value: selected } });
    }
  }, [selected]);

  const handleSelect = (optValue) => {
    setSelected(optValue);
    setIsOpen(false);
    setSearchTerm("");
    
    // Call onBlur if provided
    if (onBlur) {
      onBlur({ target: { name, value: optValue } });
    }
  };

  return (
    <div
      className="form-field flex flex-col mb-3 w-[100%] md:w-[90%]"
      ref={dropdownRef}
    >
      {/* Label */}
      <label className="form-label font-t mb-2" htmlFor={name}>
        {label}
      </label>

      {/* Custom Dropdown */}
      <div
        className="relative font-t p-3 py-5 rounded-[20px] border border-gray-300 text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={getIcon(label)}
              className={`${iconColor(label)}`}
            />
            <span>
              {fullOptions.find((o) => o.value === selected)?.label || placeholder}
            </span>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Search Input - Only for State dropdown (more than 10 options) */}
            {options.length > 10 && (
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {/* Options List with scrolling */}
            <ul className="max-h-48 overflow-y-auto">
              {filteredOptions.map((opt, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer ${
                    opt.value === "" ? "text-gray-400" : ""
                  } ${opt.value === selected ? "bg-blue-50" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(opt.value);
                  }}
                >
                  <FontAwesomeIcon
                    icon={getIcon(label)}
                    className={`${iconColor(label)} text-xs`}
                  />
                  {opt.label}
                </li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="p-3 text-gray-500 text-center">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 🔥 FIX: Validation Message - Only show when message exists (parent handles touched logic) */}
      {message && (
        <p
          className={`text-sm flex items-center gap-1 mt-0.5 mb-1 ${
            isSuccess ? "text-green-400" : "text-red-400"
          }`}
        >
          <FontAwesomeIcon
            icon={isSuccess ? faCheck : faXmark}
            className={isSuccess ? "text-green-400" : "text-red-400"}
          />
          <span>{message}</span>
        </p>
      )}
    </div>
  );
}

export default FormSelect;