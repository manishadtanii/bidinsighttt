import React, { useEffect, useState } from "react";
import axios from "axios";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormFooter from "../components/FormFooter";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";
import api from "../utils/axios"; 
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate()
  const [enabledFields, setEnabledFields] = useState({});
  const [fields, setFields] = useState({
    workersCompensationAmount: "",
    generalLiabilityAmount: "",
    autoLiabilityAmount: "",
    medicalProfessionalAmount: "",
    environmentAmount: "",
    cybersecurityAmount: "",
  });
  const [errors, setErrors] = useState({
    workersCompensationAmount: "",
    generalLiabilityAmount: "",
    autoLiabilityAmount: "",
    medicalProfessionalAmount: "",
    environmentAmount: "",
    cybersecurityAmount: "",
  });
  const [touched, setTouched] = useState({
    workersCompensationAmount: false,
    generalLiabilityAmount: false,
    autoLiabilityAmount: false,
    medicalProfessionalAmount: false,
    environmentAmount: false,
    cybersecurityAmount: false,
  });

  const fieldToPrefKey = {
    workersCompensationAmount: "workersCompensation",
    generalLiabilityAmount: "generalLiability",
    autoLiabilityAmount: "autoLiability",
    medicalProfessionalAmount: "medicalProfessional",
    environmentAmount: "environmentalInsurance",
    cybersecurityAmount: "cyberInsurance",
  };

  useEffect(() => {
    const savedData = localStorage.getItem("insurancePreferences");
    if (savedData) {
      setEnabledFields(JSON.parse(savedData));
    }
  }, []);

  // Validation logic
  const validateField = (name, value) => {
    // Only validate if enabled
    if (enabledFields[name.replace("Amount", "")] === "no") return { msg: "", type: "" };
    if (!value) return { msg: "This field is required", type: "error" };
    if (!/^[0-9]+$/.test(value)) return { msg: "Please enter digits", type: "error" };
    return { msg: "This field is valid", type: "success" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { msg, type } = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { msg, type } = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { ...errors };
    let newTouched = { ...touched };
    let valid = true;
    Object.keys(fields).forEach((key) => {
      if (enabledFields[fieldToPrefKey[key]] !== "no") {
        newTouched[key] = true;
        const { msg, type } = validateField(key, fields[key]);
        newErrors[key] = msg;
        if (type !== "success") valid = false;
      }
    });
    setTouched(newTouched);
    setErrors(newErrors);
    if (valid) {
      // Prepare payload
      const insuranceMap = {
        workersCompensationAmount: "workers_compensation_amount",
        generalLiabilityAmount: "general_liability_insurance_amount",
        autoLiabilityAmount: "auto_mobile_liability_insurance_amount",
        medicalProfessionalAmount: "medical_professional_eso_insurance_amount",
        environmentAmount: "enviormental_insurance_amount",
        cybersecurityAmount: "cyber_security_insurance_amount",
      };
      const boolMap = {
        workersCompensation: "workers_compensation",
        generalLiability: "general_liability_insurance",
        autoLiability: "auto_mobile_liability_insurance",
        medicalProfessional: "medical_professional_eso_insurance",
        environmentalInsurance: "enviormental_insurance",
        cyberInsurance: "cyber_security_insurance",
      };
      const payload = {
        region: 1, // TODO: Replace with actual region from Redux or form
        industry: 1, // TODO: Replace with actual industry from Redux or form
        states: [1, 5, 6], // TODO: Replace with actual states from Redux or form
      };
      // Add boolean fields
      Object.entries(boolMap).forEach(([key, apiKey]) => {
        payload[apiKey] = enabledFields[key] === "yes";
      });
      // Add amount fields
      Object.entries(insuranceMap).forEach(([key, apiKey]) => {
        payload[apiKey] = fields[key] ? Number(fields[key]) : null;
      });
      try {
        const res = await api.post("/auth/profile/", payload);
        console.log("✅ Profile submitted successfully:", res.data);
        navigate("/dashboard")
        // console.log("✅ Profile submitted successfully:", res.data);
        navigate("/dashboard")
        alert("Profile submitted successfully!");
      } catch (err) {
        if (err.response) {
          console.error("❌ API Error:", err.response.data);
          alert("API Error: " + JSON.stringify(err.response.data));
        } else {
          console.error("❌ Network Error:", err.message);
          alert("Network Error: " + err.message);
        }
      }
    }
  };

  return (
    <ProcessWrapper>
      <div className="form-left">
        <div className="pe-3 flex flex-col justify-between h-full">
          <div>
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>

          <form className="forn-container flex flex-col h-full justify-between" onSubmit={handleSubmit}>
            <div>
              <FormField
                label="Workers compensation insurance amount per occurrence & per aggregate"
                type="text"
                name="workersCompensationAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields[fieldToPrefKey.workersCompensationAmount] === "no"}
                value={fields.workersCompensationAmount}
                onChange={enabledFields[fieldToPrefKey.workersCompensationAmount] === "no" ? () => {} : handleChange}
                onBlur={enabledFields[fieldToPrefKey.workersCompensationAmount] === "no" ? () => {} : handleBlur}
                message={enabledFields[fieldToPrefKey.workersCompensationAmount] === "no" ? "" : (touched.workersCompensationAmount && errors.workersCompensationAmount ? errors.workersCompensationAmount : "")}
                messageType={enabledFields[fieldToPrefKey.workersCompensationAmount] === "no" ? "" : (touched.workersCompensationAmount && errors.workersCompensationAmount === "This field is valid" ? "success" : touched.workersCompensationAmount && errors.workersCompensationAmount ? "error" : "")}
              />
              <FormField
                label="General liability insurance amount per occurrence & per aggregate"
                type="text"
                name="generalLiabilityAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields[fieldToPrefKey.generalLiabilityAmount] === "no"}
                value={fields.generalLiabilityAmount}
                onChange={enabledFields[fieldToPrefKey.generalLiabilityAmount] === "no" ? () => {} : handleChange}
                onBlur={enabledFields[fieldToPrefKey.generalLiabilityAmount] === "no" ? () => {} : handleBlur}
                message={enabledFields[fieldToPrefKey.generalLiabilityAmount] === "no" ? "" : (touched.generalLiabilityAmount && errors.generalLiabilityAmount ? errors.generalLiabilityAmount : "")}
                messageType={enabledFields[fieldToPrefKey.generalLiabilityAmount] === "no" ? "" : (touched.generalLiabilityAmount && errors.generalLiabilityAmount === "This field is valid" ? "success" : touched.generalLiabilityAmount && errors.generalLiabilityAmount ? "error" : "")}
              />
              <FormField
                label="Automobile liability insurance amount per occurrence & per aggregate"
                type="text"
                name="autoLiabilityAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields[fieldToPrefKey.autoLiabilityAmount] === "no"}
                value={fields.autoLiabilityAmount}
                onChange={enabledFields[fieldToPrefKey.autoLiabilityAmount] === "no" ? () => {} : handleChange}
                onBlur={enabledFields[fieldToPrefKey.autoLiabilityAmount] === "no" ? () => {} : handleBlur}
                message={enabledFields[fieldToPrefKey.autoLiabilityAmount] === "no" ? "" : (touched.autoLiabilityAmount && errors.autoLiabilityAmount ? errors.autoLiabilityAmount : "")}
                messageType={enabledFields[fieldToPrefKey.autoLiabilityAmount] === "no" ? "" : (touched.autoLiabilityAmount && errors.autoLiabilityAmount === "This field is valid" ? "success" : touched.autoLiabilityAmount && errors.autoLiabilityAmount ? "error" : "")}
              />
              <FormField
                label="Medical/ Professional/ ESO liability insurance amount per occurrence & per aggregate"
                type="text"
                name="medicalProfessionalAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields[fieldToPrefKey.medicalProfessionalAmount] === "no"}
                value={fields.medicalProfessionalAmount}
                onChange={enabledFields[fieldToPrefKey.medicalProfessionalAmount] === "no" ? () => {} : handleChange}
                onBlur={enabledFields[fieldToPrefKey.medicalProfessionalAmount] === "no" ? () => {} : handleBlur}
                message={enabledFields[fieldToPrefKey.medicalProfessionalAmount] === "no" ? "" : (touched.medicalProfessionalAmount && errors.medicalProfessionalAmount ? errors.medicalProfessionalAmount : "")}
                messageType={enabledFields[fieldToPrefKey.medicalProfessionalAmount] === "no" ? "" : (touched.medicalProfessionalAmount && errors.medicalProfessionalAmount === "This field is valid" ? "success" : touched.medicalProfessionalAmount && errors.medicalProfessionalAmount ? "error" : "")}
              />
              <FormField
                label="Environment insurance amount per occurrence & per aggregate"
                type="text"
                name="environmentAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields[fieldToPrefKey.environmentAmount] === "no"}
                value={fields.environmentAmount}
                onChange={enabledFields[fieldToPrefKey.environmentAmount] === "no" ? () => {} : handleChange}
                onBlur={enabledFields[fieldToPrefKey.environmentAmount] === "no" ? () => {} : handleBlur}
                message={enabledFields[fieldToPrefKey.environmentAmount] === "no" ? "" : (touched.environmentAmount && errors.environmentAmount ? errors.environmentAmount : "")}
                messageType={enabledFields[fieldToPrefKey.environmentAmount] === "no" ? "" : (touched.environmentAmount && errors.environmentAmount === "This field is valid" ? "success" : touched.environmentAmount && errors.environmentAmount ? "error" : "")}
              />
              <FormField
                label="Cybersecurity insurance amount per occurrence & per aggregate"
                type="text"
                name="cybersecurityAmount"
                placeholder="e.g. Value"
                delay={100}
                disabled={enabledFields[fieldToPrefKey.cybersecurityAmount] === "no"}
                value={fields.cybersecurityAmount}
                onChange={enabledFields[fieldToPrefKey.cybersecurityAmount] === "no" ? () => {} : handleChange}
                onBlur={enabledFields[fieldToPrefKey.cybersecurityAmount] === "no" ? () => {} : handleBlur}
                message={enabledFields[fieldToPrefKey.cybersecurityAmount] === "no" ? "" : (touched.cybersecurityAmount && errors.cybersecurityAmount ? errors.cybersecurityAmount : "")}
                messageType={enabledFields[fieldToPrefKey.cybersecurityAmount] === "no" ? "" : (touched.cybersecurityAmount && errors.cybersecurityAmount === "This field is valid" ? "success" : touched.cybersecurityAmount && errors.cybersecurityAmount ? "error" : "")}
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
