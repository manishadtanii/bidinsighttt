import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormFooter from "../components/FormFooter";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";

function ExtraData() {
  const data = {
    title: "Extra Data, Maximum Compatibility",
    para: "Your A.I. profile is tuned to score every RFP by how well it fits you.",
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
    activeStep: 5,
  };
  const formFooter = {
    back: {
      text: "Back",
      link: "/help-our-ai",
    },
    next: {
      text: "Submit",
      link: "",
    },
    skip:"" 
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
                  className="forn-container flex flex-col  h-full justify-between"
                >
                  <div className="">
                    <FormField
                      label="General liability insurance amount per occurrence & per aggregate"
                      type={"text"}
                      name="companyName"
                      placeholder="e.g. Value  "
                      delay={100}
                    />
                    <FormField
                      label="Automobile liability insurance amount per occurrence & per aggregate"
                      type={"text"}
                      name="companyFienOrSsn"
                      placeholder="e.g. Value"
                      delay={100}
                    />
                    <FormField
                      label="Medical/ Professional/ ESO liability insurance amount per occurrence & per aggregate"
                      type={"text"}
                      name="companyWebsite"
                      placeholder="e.g. Value"
                      delay={100}
                    />
                    <FormField
                      label="Environment insurance amount per occurrence & per aggregate"
                      type={"text"}
                      name="companyWebsite"
                      placeholder="e.g. Value"
                      delay={100}
                    />
                    <FormField
                      label="Cybersecurity insurance amount per occurrence & per aggregate"
                      type={"text"}
                      name="companyWebsite"
                      placeholder="e.g. Value"
                      delay={100}
                    />

                  </div>

                  <FormFooter data={formFooter} />
                </form>
              </div>
            </div>
            <FormImg src={"login-img.png"} />
    </ProcessWrapper>
  );
}

export default ExtraData;
