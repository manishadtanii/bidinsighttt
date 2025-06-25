import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";

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
      link: "/",
    },
    next: {
      text: "Login",
      link: "/",
    },
  };
  return (
    <>
      <div className="login bg-blue overflow-hidden px-5 md:px-10">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
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
            <div className="form-right hidden lg:block overflow-hidden">
              <div className="form-img flex items-center justify-center ">
                <img src="/login-img.png" className="h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
