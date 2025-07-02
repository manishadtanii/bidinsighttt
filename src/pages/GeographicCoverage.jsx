import React, { useState } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormRadio from "../components/FormRadio";
import FormImg from "../components/FormImg";
import FormMultiSelect from "../components/FormMultiSelect";
import ProcessWrapper from "../components/ProcessWrapper";

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
    <ProcessWrapper>
      <div className="form-left">
        <div className="flex flex-col justify-between h-full">
          <div className="">
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>
          <form
            action=""
            method="post"
            className="forn-container flex flex-col  h-full justify-between"
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
              <div className="form-label font-t my-5" htmlFor="upload">
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
              <FormMultiSelect
                label="Select Industries"
                name="industries"
                placeholder="Choose industries"
                options={[
                  { label: "IT", value: "it" },
                  { label: "Construction", value: "construction" },
                  { label: "Healthcare", value: "healthcare" },
                  { label: "Finance", value: "finance" },
                ]}
                onChange={(selected) =>
                  console.log("Selected values:", selected)
                }
              />
            </div>

            <FormFooter data={formFooter} />
          </form>
        </div>
      </div>
      <div className="sticky top-0">
        <FormImg src={"geographic-coverage.png"} />
      </div>
    </ProcessWrapper>
  );
}

export default GeographicCoverage;
