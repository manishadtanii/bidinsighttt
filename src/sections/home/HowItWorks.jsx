import React from "react";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

function HowItWorks() {
  const data = [
    {
      number:"01:",
      title:"Register",
      para:"Create your free BidInsight account in under two minutes - just your name, email, and a secure password to get started.",
      btnText:"Register/ Login",
      link:"/"
    },
    {
      number:"02:",
      title:"Select Plan & Payment",
      para:"Choose the subscription tier that fits your needs and enter your payment details securely to unlock full access.",
      btnText:"View Plan",
      link:"/"
    },
    {
      number:"03:",
      title:"Profile Set-up",
      para:"Tell us about your business – industry codes, contract history, geographic focus – so we can surface the most relevant opportunities.",
      btnText:"Set Profile",
      link:"/"
    },
    {
      number:"04:",
      title:"Start Bidding!",
      para:"Dive into our real-time RFP feed, filter for your targets and submit winning proposals right from your dashboard.",
      btnText:"Go to Bids",
      link:"/"
    },
  ]
  return (
    <div className="how-it-works">
      <div className="let-show bg-image bg-[url('https://bid-insight.vercel.app/line-bg.png')]">
        <div className="container-fixed">
          <div className="flex flex-col md:flex-row justify-center items-center h-screen gap-4">
            <Heading
              textD={"Let’s show you how to"}
              textAlign={"text-center"}
            />
            <Button
              text={"Get Started"}
              btnBg={"bg-primary text-white"}
              arrowBg={"bg-white text-primary"}
            />
          </div>
        </div>
      </div>
      <div className="work-content">
        {data.map((item, index)=>(
          <div className="work-item bg-blue rounded-[30px]" key={index}>
          <div className="container-section">
            <div className="main-title font-bold text-[100px] font-h text-white">
              {item.number}
            </div>
            <div className="work-content grid lg:grid-cols-2 gap-5">
              <div className="work-img"><img src="work-img.png" alt="" /></div>
              <div className="work-text">
                <div className="title font-h font-bold h2 text-white">
                  {item.title}
                </div>
                <div className="para font-t body-t text-white py-6 font-light">
                  {item.para}
                </div>
                <div className="flex">
                  <Button link={item.link} text={item.btnText} btnBg={"bg-white"} arrowBg={"bg-primary text-white"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default HowItWorks;
