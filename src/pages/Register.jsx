import React from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormField from "../components/FormField";
import FormPassword from "../components/FormPassword";
import FormFooter from "../components/FormFooter";
import { Link } from "react-router-dom";

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
    
  };
  return (
    <>
      <div className="login bg-blue  w-screen px-5 md:px-10">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-left flex flex-col  justify-between  ">
              <div className="pe-3">
                <FormHeader {...formHeader} />

                <HeroHeading data={data} />
                <form
                  action=""
                  method="post"
                  className="forn-container flex flex-col  h-full justify-between max-h-[100%]"
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

                  <div className="accept">
                    <label className="flex items-center text-white font-t font-normal">
                      <input type="checkbox" className="mr-2" />I accept the
                      <Link className="underline" to="/policy">
                        {" "}
                        Privacy Policy{" "}
                      </Link>
                      ,
                      <Link className="underline" to="/terms">
                        {" "}
                        T&C{" "}
                      </Link>
                      ,
                      <Link className="underline" to="/member-terms">
                        {" "}
                        Member Terms{" "}
                      </Link>{" "}
                      and
                      <Link className="underline" to="/disclaimer">
                        {" "}
                        Disclaimer{" "}
                      </Link>
                      .
                    </label>
                  </div>
                  <FormFooter data={formFooter} />
                </form>
              </div>
            </div>
            <div className="form-right hidden lg:block overflow-hidden ">
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

export default Register;
