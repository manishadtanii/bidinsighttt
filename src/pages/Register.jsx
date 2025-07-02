import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import FormImg from "../components/FormImg";
import ProcessWrapper from "../components/ProcessWrapper";

function Register() {
  const data = {
    title: "Ready to Win More Contracts?",
    para: "All government bids. One dashboard. Zero hassles.",
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
    activeStep: 0,
  };
  const formFooter = {
    back: {
      text: "Back",
      link: "/login",
    },
    next: {
      text: "Next",
      link: "/company-build",
    },
    skip: {
      text: "",
      link: "",
    },
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
                label="Full Name"
                type={"text"}
                name="fullName"
                placeholder="e.g. John Doe"
                delay={100}
              />
              <FormField
                label="Email"
                type={"email"}
                name="email"
                placeholder="e.g. jopseph.mark12@gmail.com"
                delay={100}
              />
              <FormPassword
                label="Password"
                placeholder="e.g. m@rkJos6ph"
                name="password"
                id="password"
                delay={100}
              />
              <FormPassword
                label="Confirm password"
                placeholder="e.g. m@rkJos6ph"
                name="password"
                id="password"
                delay={100}
              />
            </div>
            <div className="">
              <div className="accept">
                <label className=" text-white font-t font-normal">
                  <input type="checkbox" className="mr-2" />I accept the &nbsp;
                  <Link className="underline" to="/policy">
                    Privacy Policy{" "}
                  </Link>
                  ,&nbsp;
                  <Link className="underline" to="/terms">
                    T&C
                  </Link>
                  ,&nbsp;
                  <Link className="underline" to="/member-terms">
                    Member Terms
                  </Link>
                  &nbsp;and&nbsp;
                  <Link className="underline" to="/disclaimer">
                    Disclaimer
                  </Link>
                  .
                </label>
              </div>
              <FormFooter data={formFooter} />
            </div>
          </form>
        </div>
      </div>
      <div className="sticky top-0">
        <FormImg src={"login-img.png"} />
      </div>
    </ProcessWrapper>
  );
}

export default Register;
