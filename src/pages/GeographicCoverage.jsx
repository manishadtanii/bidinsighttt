import React, { useState } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormFooter from "../components/FormFooter";
import FormRadio from "../components/FormRadio";
import FormImg from "../components/FormImg";
import FormMultiSelect from "../components/FormMultiSelect";
import ProcessWrapper from "../components/ProcessWrapper";

function GeographicCoverage() {
  const data = {
    title: "Where Should We Look?",
    para: "Select states, regions or nationwide so we only surface relevant bids.",
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

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [nationwideSelected, setNationwideSelected] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  // When Nationwide selected -> clear regions & industries
  const handleNationwide = () => {
    setNationwideSelected(true);
    setSelectedRegions([]);
    setSelectedIndustries([]);
  };

  // When region selected -> clear nationwide & industries
  const handleRegionChange = (value) => {
    if (selectedRegions.includes(value)) {
      setSelectedRegions((prev) => prev.filter((v) => v !== value));
    } else if (selectedRegions.length < 3) {
      setSelectedRegions((prev) => [...prev, value]);
    }
    setNationwideSelected(false);
    setSelectedIndustries([]);
  };

  // When industry selected -> clear region & nationwide
  const handleIndustryChange = (selected) => {
    setSelectedIndustries(selected);
    setNationwideSelected(false);
    setSelectedRegions([]);
  };

  return (
    <ProcessWrapper>
      <div className="form-left">
        <div className="flex flex-col justify-between h-full">
          <div>
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>

          <form className="forn-container flex flex-col h-full justify-between">
            <div className="w-[100%] md:w-[90%]">
              {/* Nationwide Option */}
              <FormRadio
                label="Nationwide"
                type="radio"
                name="region"
                value="Nationwide"
                delay={100}
                selectedValue={nationwideSelected ? "Nationwide" : ""}
                onChange={handleNationwide}
              />

              {/* Region Options */}
              <div className="form-label font-t my-5" htmlFor="upload">
                Select region wise
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regions.map((reg, i) => (
                  <FormRadio
                    key={i}
                    type="checkbox"
                    label={reg}
                    name="region-multi"
                    value={reg}
                    selectedValues={selectedRegions}
                    onChange={() => handleRegionChange(reg)}
                    maxSelected={3}
                    delay={i * 100}
                  />
                ))}
              </div>

              {/* Multi-select Industries */}
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
                value={selectedIndustries}
                onChange={handleIndustryChange}
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
