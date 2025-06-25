import React from "react";
import { Link } from "react-router-dom";

function FormFooter({ data }) {
  const { back, next, skip } = data;
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-5">
      <div className="flex flex-col text-center md:flex-row gap-2 w-full lg:w-auto">
        {back && (
          <Link
          to={back.link}
          className="rounded-[20px] text-white text-lg p-3 lg:py-4 lg:px-10 font-h border border-white transition-all duration-300"
        >
          {back.text}
        </Link>
        )}
        {next && (
          <Link
            to={next.link}
            className="rounded-[20px] bg-[#273BE2] md:ms-5  text-white text-lg p-3 lg:py-4 lg:px-10 font-h border border-[rgba(255,255,255,0.5)] transition-all duration-300"
          >
            {next.text}
          </Link>
        )}
      </div>
     <div className="">
       {skip && (
        <Link
          to={skip.link}
          className="  text-white text-lg p-3 lg:p-4 font-h transition-all duration-300"
        >
          {skip.text}
        </Link>
      )}
     </div>
    </div>
  );
}

export default FormFooter;
