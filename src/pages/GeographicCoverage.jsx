import React, { useState } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormRadio from "../components/FormRadio";

function GeographicCoverage() {
  const data = {
    title: "Where Should We Look?",
    para: "Select states, regions or nationwide so we only surface relevant bids. ",
    btnText: false,
    btnLink: false,
    container: "max-w-4xl mx-auto text-left",
    headingSize: "h3",
    pSize: "text-xl",
  };
  const formHeader = {
    title: "Log In",
    link: "/login",
    steps: 6,
    activeStep: 2,
  };
  const formFooter = {
    back: {
      text: "Back",
      link: "/company-build",
    },
    next: {
      text: "Next",
      link: "/industry-categories",
    },
    skip: {
      text: "Skip",
      link: "/industry-categories",
    },
  };
  const regions = [
    "Northeast",
    "Northwest",
    "South",
    "Southeast",
    "Midwest",
    "West",
  ];
  const [selectedRegion, setSelectedRegion] = useState("");
  return (
    <>
      <div className="login bg-blue  w-screen px-5 md:px-10">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-left flex flex-col justify-between">
              <div className="pe-3">
                <FormHeader {...formHeader} />

                <HeroHeading data={data} />
                <form
                  action=""
                  method="post"
                  className="forn-container flex flex-col h-full justify-between max-h-[100%]"
                >
                  <div className="w-[100%] md:w-[90%]">
                    <FormRadio
                      label="Nationwide"
                      type="radio"
                      name="region"
                      value="Nationwide"
                      delay={100}
                      selectedValue={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    />
                    <div className="form-label font-t my-10" htmlFor="upload">
                      Select region wise
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {regions.map((reg, i) => (
                        <FormRadio
                          key={i}
                          type={"radio"}
                          label={reg}
                          name="region"
                          value={reg}
                          selectedValue={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          delay={i * 100}
                        />
                      ))}
                    </div>
                  </div>

                  <FormFooter data={formFooter} />
                </form>
              </div>
            </div>
            <div className="form-right hidden lg:block overflow-hidden rounded-[50px]">
              <div className="form-img flex items-center justify-center ">
                <img
                  src="/geographic-coverage.png"
                  className="max-h-full"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeographicCoverage;
