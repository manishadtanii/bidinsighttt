import React from "react";
import { Link } from "react-router-dom";

function FormFooter({}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between items-center gap-5">
     <div className="flex flex-col text-center md:flex-row justify-between gap-4 w-full md:w-auto">
         <Link
        to="/login"
        className="rounded-[20px] text-white text-lg p-3 lg:p-4 font-h border border-white transition-all duration-300"
      >
        Don’t have an account, Register
      </Link>
      <button
        to="/login"
        className="rounded-[20px] bg-[#273BE2] md:ms-5  text-white text-lg p-3 lg:p-4 font-h border border-[rgba(255,255,255,0.5)] transition-all duration-300"
      >
        Login
      </button>
     </div>
      <Link
        to="/login"
        className="  text-white text-lg p-3 lg:p-4 font-h transition-all duration-300"
      >
        Skip
      </Link>
    </div>
  );
}

export default FormFooter;
