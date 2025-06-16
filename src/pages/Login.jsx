import React, { useState } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormFooter from "../components/FormFooter";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";

function Login() {
  const data = {
    title: "Hello, again!",
    para: "Fresh bids & smart analytics are just a click away! Never miss an opportunity.",
    btnText: false,
    btnLink: false,
    container: "max-w-4xl mx-auto text-left",
  };
  const formHeader = {
    title: "Signup",
    link: "/register",
    steps: false,
    activeStep: 0,
  };

  return (
    <>
      <div className="login bg-blue  w-screen px-5 md:px-10">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-left flex flex-col  justify-between">
              <div className="">
                <FormHeader {...formHeader} />

                <HeroHeading data={data} />
                <form action="" method="post">
                  <FormField
                    label="Email"
                    type={"email"}
                    name="email"
                    placeholder="e.g. jopseph.mark12@gmail.com"
                  />
                  <FormPassword
                    label="Password"
                    placeholder="e.g. m@rkJos6ph"
                    name="password"
                    id="password"
                  />
                </form>
              </div>
              <FormFooter />
            </div>
            <div className="form-right hidden lg:block overflow-hidden rounded-[50px]">
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
