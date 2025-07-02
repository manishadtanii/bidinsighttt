import React, { useState, useEffect, useRef } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link, Navigate } from "react-router-dom";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";
import { useNavigate } from "react-router-dom";
function Verification() {
  const data = {
    title: "Verify your Email to begin your Biding",
    para: "All government bids. One dashboard. Zero hassles.",
    btnText: false,
    btnLink: false,
    container: "max-w-4xl mx-auto text-left",
    headingSize: "h1",
    pSize: "text-xl",
  };
  const formHeader = {
    title: "Log In",
    link: "/login",
    steps: "",
    activeStep: 0,
  };
  const formFooter = {
    back: {
      text: "Back",
      link: "/login",
    },
    next: {
      text: "Verify",
      link: "",
    },
    skip: {
      text: "",
      link: "",
    },
  };
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpMessageType, setOtpMessageType] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpMessage("");
      setOtpMessageType("");
      if (value && index < 5) inputsRef.current[index + 1].focus();
      // Real-time validation
      if (newOtp.every((d) => d.length === 1)) {
        setOtpMessage("OTP entered successfully");
        setOtpMessageType("success");
      } else {
        setOtpMessage("");
        setOtpMessageType("");
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6 || otp.some((d) => d === "")) {
      setOtpMessage("OTP invalid, please fill all 6 digits");
      setOtpMessageType("error");
      return;
    }
    setOtpMessage("OTP entered successfully");
    setOtpMessageType("success");
    // Call your API here


    navigate("/plan");  
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(120);
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();
      console.log("OTP resent!");
      // Call resend OTP API here
    }
  };
  return (
    <ProcessWrapper>
      <div className="form-left">
        <div className="pe-3 flex flex-col justify-between h-full">
          <div className="">
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>

          <div className="h-full">
            <div className="mt-10">
              <p className="mb-2 text-white">
                Enter the 6 digit verification code
              </p>
              <div className="flex gap-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-10 md:w-14 h-10 md:h-14 rounded-md bg-transparent border border-white text-3xl text-center focus:outline-none focus:ring-2 focus:ring-white text-white"
                  />
                ))}
              </div>
              {otpMessage && (
                <p
                  className={`text-sm flex items-center gap-1 mt-2 mb-1 ${
                    otpMessageType === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {otpMessageType === "success" ? (
                    <span className="flex items-center">
                      <i className="fa-solid fa-check text-green-400"></i>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <i className="fa-solid fa-xmark text-red-400"></i>
                    </span>
                  )}
                  <span>{otpMessage}</span>
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 text-white">
                {timer > 0 ? (
                  <p>
                    Resend Code in{" "}
                    <span className="font-bold">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="underline hover:text-blue-300"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          </div>
          <FormFooter data={formFooter} onNextClick={handleVerify} />
        </div>
      </div>
      <div className="sticky top-0">
        <FormImg src={"login-img.png"} />
      </div>
    </ProcessWrapper>
  );
}

export default Verification;
