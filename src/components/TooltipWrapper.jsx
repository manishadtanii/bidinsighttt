// components/TooltipWrapper.jsx
import React, { useState } from "react";
import TooltipBubble from "./TooltipBubble";

const TooltipWrapper = ({ children, title, description, position = "top" }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } left-1/2 transform -translate-x-1/2`}
        >
          <TooltipBubble title={title} description={description} />
        </div>
      )}
    </div>
  );
};

export default TooltipWrapper;
