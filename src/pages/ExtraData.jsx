// ✅ Updated ExtraData.jsx - Skip karne par bhi inputs background mein visible
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormFooter from "../components/FormFooter";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";
import SubmissionModal from "../components/SubmissionModal";
import api from "../utils/axios";
import { clearOnboardingData, setSkippedInsurance } from "../redux/reducer/onboardingSlice";
import { checkTTLAndClear } from "../utils/ttlCheck";

function ExtraData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const insuranceData = useSelector((state) => state.onboarding.insuranceData);
  const skippedInsurance = useSelector((state) => state.onboarding.skippedInsurance);

  // ✅ Separate states for modal and form display
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [isSkipMode, setIsSkipMode] = useState(false);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

   useEffect(() => {
      checkTTLAndClear(navigate);
    }, []);

  // Field mapping
  const insuranceFields = {
    workersCompensation: "workersCompensationAmount",
    generalLiability: "generalLiabilityAmount",
    autoLiability: "autoLiabilityAmount",
    medicalProfessional: "medicalProfessionalAmount",
    environmentalInsurance: "environmentAmount",
    cyberInsurance: "cybersecurityAmount",
  };

  // ✅ Always show all possible fields for better UX
  const allPossibleFields = useMemo(() => {
    return Object.values(insuranceFields);
  }, []);

  // ✅ Fields to actually validate/submit (based on user selections)
  const enabledKeys = useMemo(() => {
    if (isSkipMode) {
      return []; // Skip mode mein validation nahi
    }
    return Object.entries(insuranceFields)
      .filter(([key]) => insuranceData?.[key] === "yes")
      .map(([_, value]) => value);
  }, [insuranceData, isSkipMode]);

  // ✅ Setup initial fields - show all but only validate enabled ones
  useEffect(() => {
    const newState = {};
    allPossibleFields.forEach((key) => {
      newState[key] = "";
    });
    setFields(newState);
    setErrors({ ...newState });
    setTouched({ ...newState });
  }, [allPossibleFields]);

  // ✅ Handle previous skip state
  useEffect(() => {
    if (skippedInsurance) {
      setShowSkipModal(true);
      setIsSkipMode(true);
      dispatch(setSkippedInsurance(false));
    }
  }, [skippedInsurance, dispatch]);

  const validateField = (name, value) => {
    if (!value) return { msg: "This field is required", type: "error" };
    if (!/^[0-9]+$/.test(value)) return { msg: "Please enter digits", type: "error" };
    return { msg: "This field is valid", type: "success" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Only validate if field is enabled or not in skip mode
    if (!isSkipMode && enabledKeys.includes(name)) {
      const { msg } = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Only validate if field is enabled or not in skip mode
    if (!isSkipMode && enabledKeys.includes(name)) {
      const { msg } = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  };

  const submitProfile = async () => {
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
      region: 1,
      industry: 1,
      states: [1, 5, 6],
    };

    // ✅ Handle skip mode vs normal mode
    if (isSkipMode) {
      // Skip mode - set all to false/default
      Object.entries(boolMap).forEach(([key, apiKey]) => {
        payload[apiKey] = false;
      });
    } else {
      // Normal mode - use actual selections
      Object.entries(boolMap).forEach(([key, apiKey]) => {
        payload[apiKey] = insuranceData[key] === "yes";
      });

      // Only add amounts for enabled fields with values
      Object.entries(fields).forEach(([key, val]) => {
        if (val && enabledKeys.includes(key)) {
          payload[insuranceMap[key]] = Number(val);
        }
      });
    }

    try {
      const res = await api.post("/auth/profile/", payload);
      console.log("✅ Profile submitted:", res.data);

      sessionStorage.removeItem("onboardingForm");
      sessionStorage.removeItem("ttlStartTime");
      dispatch(setSkippedInsurance(false)); // Reset skip state
      dispatch(clearOnboardingData());

      navigate("/dashboard");
    } catch (err) {
      const message = err.response ? JSON.stringify(err.response.data) : err.message;
      alert("API Error: " + message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ Skip mode mein direct submit
    if (isSkipMode) {
      submitProfile();
      return;
    }

    // Normal validation for enabled fields only
    let valid = true;
    const newErrors = {};
    
    enabledKeys.forEach((key) => {
      const { msg, type } = validateField(key, fields[key]);
      newErrors[key] = msg;
      if (type !== "success") valid = false;
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched(enabledKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (valid) submitProfile();
  };

  // ✅ Skip functionality
  const handleSkip = () => {
    setShowSkipModal(true);
    setIsSkipMode(true);
  };

  const handleSkipConfirm = () => {
    setShowSkipModal(false);
    // Keep isSkipMode true and submit
    submitProfile();
  };

  // ✅ Fixed: Navigate to help-our-ai when back is clicked from modal
  const handleSkipCancel = () => {
    setShowSkipModal(false);
    setIsSkipMode(false);
    navigate("/help-our-ai"); // Navigate back to previous page
  };

  const handleBack = () => navigate("/help-our-ai");

  // ✅ Helper function to check if field should be shown as active
  const isFieldActive = (key) => {
    if (isSkipMode) return false; // Skip mode mein sab inactive
    return enabledKeys.includes(key);
  };

  // ✅ Helper function to get field display state
  const getFieldProps = (key, index) => {
    const isActive = isFieldActive(key);
    const baseProps = {
      key: key,
      label: key.replace(/([A-Z])/g, " $1").trim() + " (amount)",
      name: key,
      type: "text",
      placeholder: isActive ? "e.g. Value" : "Skipped - No input needed",
      delay: index * 100,
      value: fields[key] || "",
      onChange: handleChange,
      onBlur: handleBlur,
    };

    if (isActive) {
      // Active field - normal behavior
      return {
        ...baseProps,
        message: touched[key] && errors[key] ? errors[key] : "",
        messageType: touched[key] && errors[key] === "This field is valid" 
          ? "success" 
          : touched[key] && errors[key] 
          ? "error" 
          : "",
      };
    } else {
      // Inactive field - show as disabled/dimmed
      return {
        ...baseProps,
        disabled: true,
        message: isSkipMode ? "Skipped" : "Not selected in previous step",
        messageType: "info",
        className: "opacity-50", // Visual indicator
      };
    }
  };

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
    back: { text: "Back", link: "/help-our-ai" },
    next: { text: isSkipMode ? "Continue" : "Submit", link: "" },
    skip: isSkipMode ? "" : "Skip this step", // Show skip only if not already skipped
  };

  return (
    <ProcessWrapper>
      <div className="form-left">
        <div className="pe-3 flex flex-col justify-between h-full">
          <div>
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>
          
          {/* ✅ Form container with overlay effect when modal is shown */}
          <div className={`relative ${showSkipModal ? 'overflow-hidden' : ''}`}>
            <form 
              className={`form-container flex flex-col h-full justify-between transition-opacity duration-300 ${
                showSkipModal ? 'opacity-30 pointer-events-none' : 'opacity-100'
              }`} 
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4">
                {/* ✅ Show all fields, but with different states */}
                {allPossibleFields.map((key, index) => (
                  <FormField {...getFieldProps(key, index)} />
                ))}
              </div>
              
              <FormFooter 
                data={formFooter} 
                onSkip={handleSkip} // Pass skip handler to footer
              />
            </form>

            {/* ✅ Skip Modal Overlay */}
            {showSkipModal && (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                <SubmissionModal
                  title="Skip Insurance Details?"
                  message="You can skip this step and continue. You can always add this information later."
                  onBack={handleSkipCancel}
                  onContinue={handleSkipConfirm}
                  onClose={handleSkipCancel}
                  backText="Cancel"
                  continueText="Yes, Skip"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="sticky top-0">
        <FormImg src="login-img.png" />
      </div>
    </ProcessWrapper>
  );
}

export default ExtraData;