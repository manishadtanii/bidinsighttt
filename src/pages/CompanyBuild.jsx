import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";

function CompanyBuild() {
  const data = {
    title: "Lorem ipsum dolor sit ",
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
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
    activeStep: 1,
  };
  const formFooter = {
    back: {
      text: "Back",
      link: "/register",
    },
    next: {
      text: "Next",
      link: "/geographic-coverage",
    },
    skip: {
      text: "Skip",
      link: "/geographic-coverage",
    },
  };
  return (
    <ProcessWrapper>
      <div className="form-left">
              <div className="pe-3 flex flex-col justify-between h-full">
                <div className="">
                  <FormHeader {...formHeader} />

                  <HeroHeading data={data} />
                </div>

                <form
                  action=""
                  method="post"
                  className="forn-container flex flex-col  h-full justify-between max-h-[100%]"
                >
                  <div className="">
                    <FormField
                      label="Company name"
                      type={"text"}
                      name="companyName"
                      placeholder="e.g. BidInsight "
                      delay={100}
                    />
                    <FormField
                      label="Company FIEN or SSN"
                      type={"text"}
                      name="companyFienOrSsn"
                      placeholder="e.g. XX-XXXXXXX"
                      delay={100}
                    />
                    <FormField
                      label="Company website"
                      type={"text"}
                      name="companyWebsite"
                      placeholder="e.g. www.mark-jospeh.com"
                      delay={100}
                    />
                    <div className="flex w-[100%] md:w-[90%] gap-4">
                      <FormSelect
                        label="Year in business"
                        name="yearInBusiness"
                        options={[
                          { value: "llc", label: "LLC" },
                          { value: "corporation", label: "Corporation" },
                          {
                            value: "sole-proprietorship",
                            label: "Sole Proprietorship",
                          },
                        ]}
                        delay={100}
                      />
                      <FormSelect
                        label="No. of employees"
                        name="numberOfEmployees"
                        options={[
                          { value: "llc", label: "LLC" },
                          { value: "corporation", label: "Corporation" },
                          {
                            value: "sole-proprietorship",
                            label: "Sole Proprietorship",
                          },
                        ]}
                        delay={100}
                      />
                    </div>
                    <div className="flex w-[100%] md:w-[90%] gap-4">
                      <FormSelect
                        label="State"
                        name="state"
                        options={[
                          { value: "llc", label: "LLC" },
                          { value: "corporation", label: "Corporation" },
                          {
                            value: "sole-proprietorship",
                            label: "Sole Proprietorship",
                          },
                        ]}
                        delay={100}
                      />
                      <FormSelect
                        label="Target contract size"
                        name="targetContractSize"
                        options={[
                          { value: "llc", label: "LLC" },
                          { value: "corporation", label: "Corporation" },
                          {
                            value: "sole-proprietorship",
                            label: "Sole Proprietorship",
                          },
                        ]}
                        delay={100}
                      />
                    </div>
                    <div
                      className="form-field flex flex-col mb-3 w-[100%] md:w-[90%]"
                    >
                      <div className="form-label font-t mb-2" htmlFor="upload">
                        Capability Statement
                      </div>
                      <label
                        className="form-input font-t p-3 rounded-[20px] text-center flex justify-center gap-2 text-[#E2E2E2] bg-transparent border border-gray-300 focus:ring-0"
                        htmlFor="upload"
                      >
                        <span> Upload the file </span>
                        <img src="upload.svg" alt="" />
                      </label>
                      <input
                        type="file"
                        id="upload"
                        name="upload"
                        placeh
                        older="Upload your capability statement"
                        accept=".pdf,.doc,.docx"
                        required
                        className="form-input font-t p-3 rounded-[20px] bg-transparent border border-gray-300 focus:ring-0 opacity-0 absolute pointer-events-none"
                      />
                    </div>
                    <div className="text-white font-t">
                      <b>NOTE:</b> The capability statement is essential for
                      building your company's profile, as providing
                      comprehensive information is crucial to achieving optimal
                      AI results
                    </div>
                  </div>

                  <div className="">
                    <FormFooter data={formFooter} />
                  </div>
                </form>
              </div>
            </div>
            <FormImg src={"compang-build.png"} />
    </ProcessWrapper>
  );
}

export default CompanyBuild;
