import React, { useState } from "react";
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
  // Validation state
  const [fields, setFields] = useState({
    companyName: "",
    companyFienOrSsn: "",
    companyWebsite: "",
    yearInBusiness: "",
    numberOfEmployees: "",
    state: "",
    targetContractSize: "",
    upload: null,
  });
  const [touched, setTouched] = useState({
    companyName: false,
    companyFienOrSsn: false,
    companyWebsite: false,
    yearInBusiness: false,
    numberOfEmployees: false,
    state: false,
    targetContractSize: false,
    upload: false,
  });
  const [errors, setErrors] = useState({
    companyName: "",
    companyFienOrSsn: "",
    companyWebsite: "",
    yearInBusiness: "",
    numberOfEmployees: "",
    state: "",
    targetContractSize: "",
    upload: "",
  });

  // Validation rules
  const validateField = (name, value) => {
    let msg = "";
    let type = "error";
    if (!value || (name === "upload" && !value)) {
      msg = "This field is required";
    } else {
      if (name === "companyWebsite") {
        // Require http:// or https://
        const urlRegex = /^(https?:\/\/)[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
        msg = urlRegex.test(value)
          ? "Website is valid"
          : "Enter a valid website URL (must start with http:// or https://)";
        type = urlRegex.test(value) ? "success" : "error";
      } else if (["yearInBusiness", "numberOfEmployees", "state", "targetContractSize"].includes(name)) {
        msg = "This field is selected";
        type = "success";
      } else {
        msg = "This field is valid";
        type = "success";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
    return type;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type: inputType, files } = e.target;
    let val = inputType === "file" ? files[0] : value;
    setFields((prev) => ({ ...prev, [name]: val }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, val);
  };

  // On blur, mark as touched
  const handleBlur = (e) => {
    const { name, value, type: inputType, files } = e.target;
    let val = inputType === "file" ? files[0] : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, val);
  };

  // Get messageType for icon coloring
  const getMessageType = (name) => {
    if (!touched[name]) return "";
    if (name === "companyWebsite") {
      const urlRegex = /^(https?:\/\/)[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
      return urlRegex.test(fields[name]) ? "success" : "error";
    }
    if (["yearInBusiness", "numberOfEmployees", "state", "targetContractSize"].includes(name)) {
      return errors[name] === "This field is selected" ? "success" : "error";
    }
    return errors[name] === "This field is valid" || errors[name] === "Website is valid" ? "success" : "error";
  };

  // On Next click
  const handleNext = (e) => {
    e.preventDefault();
    let newTouched = { ...touched };
    let newErrors = { ...errors };
    let valid = true;
    Object.keys(fields).forEach((key) => {
      newTouched[key] = true;
      if (!fields[key] || (key === "upload" && !fields[key])) {
        newErrors[key] = "This field is required";
        valid = false;
      } else {
        // revalidate for url
        if (key === "companyWebsite") {
          const urlRegex = /^(https?:\/\/)[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
          if (!urlRegex.test(fields[key])) {
            newErrors[key] = "Enter a valid website URL (must start with http:// or https://)";
            valid = false;
          } else {
            newErrors[key] = "Website is valid";
          }
        } else if (["yearInBusiness", "numberOfEmployees", "state", "targetContractSize"].includes(key)) {
          newErrors[key] = "This field is selected";
        } else {
          newErrors[key] = "This field is valid";
        }
      }
    });
    setTouched(newTouched);
    setErrors(newErrors);
    if (valid) {
      window.location.href = "/verification";
    }
  };

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
      link: "/verification",
    },
    skip: null,
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
                type="text"
                name="companyName"
                placeholder="e.g. BidInsight "
                delay={100}
                value={fields.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                message={touched.companyName || errors.companyName ? errors.companyName : ""}
                messageType={getMessageType("companyName")}
              />
              <FormField
                label="Company FIEN or SSN"
                type="text"
                name="companyFienOrSsn"
                placeholder="e.g. XX-XXXXXXX"
                delay={100}
                value={fields.companyFienOrSsn}
                onChange={handleChange}
                onBlur={handleBlur}
                message={touched.companyFienOrSsn || errors.companyFienOrSsn ? errors.companyFienOrSsn : ""}
                messageType={getMessageType("companyFienOrSsn")}
              />
              <FormField
                label="Company website"
                type="text"
                name="companyWebsite"
                placeholder="e.g. www.mark-jospeh.com"
                delay={100}
                value={fields.companyWebsite}
                onChange={handleChange}
                onBlur={handleBlur}
                message={touched.companyWebsite || errors.companyWebsite ? errors.companyWebsite : ""}
                messageType={getMessageType("companyWebsite")}
              />
              <div className="flex w-[100%] md:w-[90%] gap-4">
                <FormSelect
                  label="Year in business"
                  name="yearInBusiness"
                  value={fields.yearInBusiness}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={[
                    { value: 1, label: "1-3" },
                    { value: 4, label: "4-7" },
                    { value: 8, label: "8+" },
                  ]}
                  delay={100}
                  message={touched.yearInBusiness || errors.yearInBusiness ? errors.yearInBusiness : ""}
                  messageType={getMessageType("yearInBusiness")}
                />
                <FormSelect
                  label="No. of employees"
                  name="numberOfEmployees"
                  value={fields.numberOfEmployees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={[
                    { value: "1-10", label: "1 to 10" },
                    { value: "11-50", label: "11 to 50" },
                    { value: "50+", label: "50+" },
                  ]}
                  delay={100}
                  message={touched.numberOfEmployees || errors.numberOfEmployees ? errors.numberOfEmployees : ""}
                  messageType={getMessageType("numberOfEmployees")}
                />
              </div>
              <div className="flex w-[100%] md:w-[90%] gap-4">
                <FormSelect
                  label="State"
                  name="state"
                  value={fields.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={[
                    { value: "1", label: "California" },
                  ]}
                  delay={100}
                  message={touched.state || errors.state ? errors.state : ""}
                  messageType={getMessageType("state")}
                />
                <FormSelect
                  label="Target contract size"
                  name="targetContractSize"
                  value={fields.targetContractSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={[
                    { value: "upto-75000", label: "Up to $75,000" },
                    { value: "75000-500000", label: "$75,000 to $500,000" },
                    { value: "above-500000", label: "Above $500,000" },
                  ]}
                  delay={100}
                  message={touched.targetContractSize || errors.targetContractSize ? errors.targetContractSize : ""}
                  messageType={getMessageType("targetContractSize")}
                />
              </div>


              <div className="form-field flex flex-col mb-2 w-[100%] md:w-[90%]">
                <label className="form-label font-t mb-2" htmlFor="upload">
                  Capability Statement
                </label>
                <label
                  htmlFor="upload"
                  className="form-input font-t p-3 rounded-[20px] text-center flex justify-center gap-2 text-[#E2E2E2] bg-transparent border border-gray-300 focus:ring-0 cursor-pointer"
                >
                  Upload the file
                  <img src="upload.svg" alt="upload" />
                </label>
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  accept=".pdf,.doc,.docx"
                  className="opacity-0 absolute pointer-events-none"
                />
                {touched.upload && errors.upload && (
                  <p
                    className={`text-sm flex items-center gap-1 mt-1 mb-1 ${getMessageType("upload") === "success" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {getMessageType("upload") === "success" ? (
                      <span className="flex items-center">
                        <i className="fa-solid text-green-400"></i>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <i className="fa-solid fa-xmark text-red-400"></i>
                      </span>
                    )}
                    <span>{errors.upload}</span>
                  </p>
                )}
              </div>


              <div className="text-white font-t">
                <b>NOTE:</b> The capability statement is essential for building
                your company's profile, as providing comprehensive information
                is crucial to achieving optimal AI results
              </div>
            </div>

            <div className="">
              <FormFooter data={formFooter} onNextClick={handleNext} />
            </div>
          </form>
        </div>
      </div>
      <div className="sticky top-0">
        <FormImg src={"compang-build.png"} />
      </div>
    </ProcessWrapper>
  );
}

export default CompanyBuild;
