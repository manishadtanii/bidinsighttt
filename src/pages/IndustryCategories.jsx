import React, { useState, useMemo } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormFooter from "../components/FormFooter";
import FormRadio2 from "../components/FormRadio2";

function IndustryCategories() {
  const data = {
    title: "Your Industry Focus",
    para: "Pick sectors where you excel. Our AI will learn your sweet spots!",
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
    activeStep: 3,
  };

  const formFooter = {
    back: {
      text: "Back",
      link: "/geographic-coverage",
    },
    next: {
      text: "Next",
      link: "/help-our-ai",
    },
    skip: {
      text: "Skip",
      link: "/help-our-ai",
    },
  };

  const allIndustries = [
    "Agriculture, Forestry, Fishing and Hunting",
    "Mining, Quarrying, Oil and Gas Extraction",
    "Utilities",
    "Construction",
    "Manufacturing",
    "Wholesale Trade",
    "Information Technology",
    "Health Care and Social Assistance",
    "Finance and Insurance",
    "Real Estate and Rental Leasing",
    "Education Services",
    "Transportation and Warehousing",
    "Retail Trade",
    "Professional, Scientific, and Technical Services",
    "Arts, Entertainment, and Recreation",
    "Accommodation and Food Services",
    "Administrative and Support Services",
    "Public Administration",
    "Other Services (except Public Administration)",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Filter industries based on search
  const filteredIndustries = useMemo(() => {
    if (!searchTerm) return allIndustries.slice(0, 6); // default to popular
    return allIndustries.filter((ind) =>
      ind.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="login bg-blue w-screen px-5 md:px-10">
      <div className="container-fixed">
        <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="form-left flex flex-col justify-between">
            <div className="pe-3">
              <FormHeader {...formHeader} />
              <HeroHeading data={data} />

              <form className="flex flex-col  justify-between">
                <div className="">
                  {/* Search input */}
                  <div className="mb-6 relative ">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search your industry"
                      className="w-full rounded-xl py-3 px-5 pr-12 bg-transparent border border-white text-white placeholder:text-white focus:outline-none "
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
                      <i class="far fa-search"></i>
                    </span>
                  </div>

                  {/* Industry Grid */}
                  <div className="font-t text-white text-p font-inter mb-4 text-center">
                    {searchTerm ? "Search Results" : "Popular Industries"}
                  </div>
                  <div className="forn-container h-[400px] pe-2">
                    {filteredIndustries.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                        {filteredIndustries.map((industry, i) => (
                          <FormRadio2
                            key={i}
                            label={industry}
                            name="industry"
                            value={industry}
                            selectedValue={selectedIndustry}
                            onChange={(e) =>
                              setSelectedIndustry(e.target.value)
                            }
                            delay={i * 100}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-white text-sm">
                        No industries found.
                      </div>
                    )}
                  </div>
                </div>
                <FormFooter data={formFooter} />
              </form>
            </div>
          </div>

          {/* Right image */}
          <div className="form-right hidden lg:block overflow-hidden rounded-[50px]">
            <div className="form-img flex items-center justify-center">
              <img
                src="/industry-categories.png"
                className=""
                alt="Industry Visual"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustryCategories;
