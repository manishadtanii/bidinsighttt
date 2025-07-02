import React, { useState, useEffect, useRef } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";

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
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);

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
      if (value && index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Call your API here
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
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

              <div className="mt-4 flex items-center gap-2 text-white">
                {timer > 0 ? (
                  <p>
                    Resend Code in <span className="font-bold">{timer}s</span>
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
      <FormImg src={"login-img.png"} />
    </ProcessWrapper>
  );
}

export default Verification;
