import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";
import ProcessWrapper from "../components/ProcessWrapper";
import FormImg from "../components/FormImg";

function Login() {
  const data = {
    title: "Hello, again!",
    para: "Fresh bids & smart analytics are just a click away! Never miss an opportunity.",
    btnText: false,
    btnLink: false,
    container: "max-w-4xl mx-auto text-left",
    headingSize: "h1",
    pSize: "text-xl",
  };
  const formHeader = {
    title: "Register",
    link: "/register",
    steps: "",
    activeStep: "",
  };
  const formFooter = {
    back: {
      text: "Don’t  have an account, Register",
      link: "/register",
    },
    next: {
      text: "Login",
      link: "/",
    },
  };
  return (
    <ProcessWrapper>
      <div className="form-left">
        <div className="pe-3  flex flex-col h-full justify-between">
          <div className="">
            <FormHeader {...formHeader} />
            <HeroHeading data={data} />
          </div>
          <form
            action=""
            method="post"
            className="flex flex-col justify-between h-full"
          >
            <div className="">
              <FormField
                label="Email"
                type={"email"}
                name="fullName"
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

export default Login;
