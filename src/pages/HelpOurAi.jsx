import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormSelect from "../components/FormSelect";
import FormImg from "../components/FormImg";

function HelpOurAi() {
  const data = {
    title: "Help Our A.I. Get Smarter!",
    para: "The more context you provide, the smarter our compatibility engine gets!",
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
    activeStep: 4,
  };
  const formFooter = {
    back: {
      text: "Back",
      link: "/industry-categories",
    },
    next: {
      text: "Next",
      link: "/extra-data",
    },
    skip: {
      text: "Skip",
      link: "/extra-data",
    },
  };
  return (
    <>
      <div className="login bg-blue">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 md:px-10 overflow-y-auto">
            <div className="form-left">
              <div className="pe-3 flex flex-col justify-between h-full">
                <div className="">
                  <FormHeader {...formHeader} />
                <HeroHeading data={data} />
                </div>
                <form
                  action=""
                  method="post"
                  className="forn-container flex flex-col  h-full justify-between"
                >
                  <div className="">
                    <div className="flex  gap-4">
                      <FormSelect
                        label="Workers compensation"
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
                        label="General liability insurance"
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
                    <div className="flex  gap-4">
                      <FormSelect
                        label="Automobile liability insurance"
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
                        label="Medical/ Professional/ ESO liability insurance"
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
                    <div className="flex  gap-4">
                      <FormSelect
                        label="Cybersecurity insurance"
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
                        label="Environmental insurance"
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
            <FormImg src={"help-ai.png"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpOurAi;
