// Updated ExtraData.jsx with dynamic field disabling based on HelpOurAi state
// Assumes selected values are stored in localStorage

import React, { useEffect, useState } from "react";
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
    skip: "",
  };

  const [enabledFields, setEnabledFields] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("insurancePreferences");
    if (savedData) {
      setEnabledFields(JSON.parse(savedData));
    }
  }, []);

  return (
    <ProcessWrapper>
      <div className="form-left">
        <div className="pe-3 flex flex-col justify-between h-full">
          <div>
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>

          <form className="forn-container flex flex-col h-full justify-between">
            <div>
              <FormField
                label="Workers compensation insurance amount per occurrence & per aggregate"
                type="text"
                name="workersCompensationAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields.workersCompensation === "no"}
              />
              <FormField
                label="General liability insurance amount per occurrence & per aggregate"
                type="text"
                name="generalLiabilityAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields.generalLiability === "no"}
              />
              <FormField
                label="Automobile liability insurance amount per occurrence & per aggregate"
                type="text"
                name="autoLiabilityAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields.autoLiability === "no"}
              />
              <FormField
                label="Medical/ Professional/ ESO liability insurance amount per occurrence & per aggregate"
                type="text"
                name="medicalProfessionalAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields.medicalProfessionalLiability === "no"}
              />
              <FormField
                label="Environment insurance amount per occurrence & per aggregate"
                type="text"
                name="environmentAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields.environmentalInsurance === "no"}
              />
              <FormField
                label="Cybersecurity insurance amount per occurrence & per aggregate"
                type="text"
                name="cybersecurityAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields.cybersecurityInsurance === "no"}
              />
            </div>

            <FormFooter data={formFooter} />
          </form>
        </div>
      </div>

      <div className="sticky top-0">
        <FormImg src={"login-img.png"} />
      </div>
    </ProcessWrapper>
  );
}

export default ExtraData;
