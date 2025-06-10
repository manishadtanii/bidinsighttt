import React from "react";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

function CallToAction() {
  return (
    <div className="call-to-action pt-[80px]">
      <div className="container-fixed px-[40px]">
        <div className="flex flex-col items-start gap-6">
            <Heading textD={"Still Thinking"} textL={"About It?"} />
        <p>
          Dive right in and discover how BidInsight simplifies your gov­ern­ment
          bidding - no heavy lifting required. Start your free trial now and see
          opportunities tailored to you, risk-free.
        </p>
        <Button btnBg={"bg-white"} text={"Get Started"} arrowBg={"bg-primary"}  />
        </div>
      </div>
      <div className="cta-img max-w-7xl ms-auto"><img src="still-img.png" className="w-full " alt="" /></div>
    </div>
  );
}

export default CallToAction;
