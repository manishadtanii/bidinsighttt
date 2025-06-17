import React from "react";

function FormRadio({
  label,
  name,
  value,
  selectedValue,
  onChange,
  delay = 100,
}) {
  const isSelected = selectedValue === value;

  return (
    <div
      className={`form-radio flex justify-between items-center mb-3 rounded-[20px] max-w-[345px] p-4 border transition-all duration-300 ${
        isSelected
          ? "bg-gradient-to-r from-[#132EC9] to-[#2D54E7] text-white border-transparent border-s-0"
          : "bg-transparent text-gray-700"
      }`}
    >
      <label
        htmlFor={`${name}-${value}`}
        className="form-label font-t cursor-pointer flex-1 pr-4"
      >
        {label}
      </label>
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={isSelected}
        onChange={onChange}
        className="form-input font-t bg-transparent cursor-pointer"
      />
    </div>
  );
}

export default FormRadio;
