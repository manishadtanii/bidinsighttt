import React from "react";

function BgCover({ children }) {
  return (
    <div className="bg-btn border-1 border-solid border-white p-4 px-5 rounded-[30px] font-inter">
      {children}
    </div>
  );
}

export default BgCover;
