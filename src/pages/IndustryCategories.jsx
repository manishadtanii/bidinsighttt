import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";

function IndustryCategories() {
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
      link: "/login",
    },
    next: {
      text: "Log In",
      link: "/login",
    },
    skip: {
      text: "Skip",
      link: "/login",
    },
  };
  return (
    <>
      <div className="login bg-blue  w-screen px-5 md:px-10">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-left flex flex-col  justify-between  ">
              <div className="pe-3">
                <FormHeader {...formHeader} />

                <HeroHeading data={data} />
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
                    <div className="flex max-w-[540px] gap-4">
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
                    <div className="flex max-w-[540px] gap-4">
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
                  </div>

                  <FormFooter data={formFooter} />
                </form>
              </div>
            </div>
            <div className="form-right hidden lg:block overflow-hidden rounded-[50px]">
              <div className="form-img flex items-center justify-center ">
                <img src="/register.png" className="max-h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndustryCategories;
