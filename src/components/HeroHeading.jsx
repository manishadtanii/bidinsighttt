import React from "react";
import Button from "./Button";

function HeroHeading({ data }) {
  const { title, para, btnText, btnLink, containter } = data;
  return (
    <div className="hero-heading">
      <div className={`${containter}`}>
        {title && <h1 className="h1 font-bold text-g">{title}</h1>}
        {para && <p className="mt-5 mb-8 text-gray-200">{para}</p>}
        {btnText && (
          <div className="flex justify-center">
            <Button text={btnText} link={btnLink} arrowBg={"bg-primary text-white"}  btnBg={"bg-white"}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroHeading;
