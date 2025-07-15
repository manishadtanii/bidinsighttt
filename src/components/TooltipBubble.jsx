import React from "react";

const TooltipBubble = ({ title, description }) => {
  return (
    <div className="absolute z-50 w-[260px] bg-[#1C2258] text-white text-sm rounded-xl p-4 shadow-xl tooltip-bubble">
      <div className="font-semibold mb-2">{title}</div>
      <p className="text-xs mb-3 text-gray-300">{description}</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm rounded-full">
        Buy plan
      </button>
    </div>
  );
};

export default TooltipBubble;
