import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormFooter from "../components/FormFooter";

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
    activeStep: 1,
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

export default ExtraData;
