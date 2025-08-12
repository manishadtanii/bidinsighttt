import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faCalendarAlt,
  faUsers,
  faHandshake,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

function FormSelect({
  label,
  name,
  options = [],
  placeholder = "Select an option",
  required = true,
  value = "",
  onChange,
  message = "",
  messageType = ""
}) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Ensure placeholder option exists
  const fullOptions = [
    { value: "", label: placeholder },
    ...options.filter((opt) => opt.value !== "")
  ];

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

 // Icon color based on label text
const iconColor = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes("state")) return "text-[#9CA3AF]"; // ✅ exact color
  return "text-gray-400";
};


  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={getIcon(label)}
            className={`${iconColor(label)}`}
          />
          <span>
            {fullOptions.find((o) => o.value === selected)?.label || placeholder}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
            {fullOptions.map((opt, i) => (
              <li
                key={i}
                className={`flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer ${
                  opt.value === "" ? "text-gray-400" : ""
                }`}
                onClick={() => {
                  setSelected(opt.value);
                  setIsOpen(false);
                }}
              >
                <FontAwesomeIcon
                  icon={getIcon(opt.label)}
                  className={`${iconColor(opt.label)}`}
                />
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Validation Message */}
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
