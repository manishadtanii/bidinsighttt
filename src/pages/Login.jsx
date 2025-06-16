import React, { useState } from "react";
import FormHeader from "../components/FormHeader";
import HeroHeading from "../components/HeroHeading";
import FormFooter from "../components/FormFooter";

function Login() {
  const data = {
    title: "Hello, again!",
    para: "Fresh bids & smart analytics are just a click away! Never miss an opportunity.",
    btnText: false,
    btnLink: false,
    container: "max-w-4xl mx-auto text-left",
  };
  const [passToggle, setPassToggle] = useState(false);
  return (
    <>
      <div className="login bg-blue  w-screen px-5 md:px-10">
        <div className="container-fixed">
          <div className="form-container py-10 h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="form-left flex flex-col  justify-between">
              <div className="">
                <FormHeader />

                <HeroHeading data={data} />
                <form action="" method="post">
                  <div className="form-field flex flex-col mb-6 max-w-[540px]">
                    <label className="form-label font-t mb-3" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input font-t p-3 rounded-[20px] bg-transparent"
                      required
                      placeholder="e.g. jopseph.mark12@gmail.com"
                    />
                  </div>
                  <div className="form-field flex flex-col mb-6 max-w-[540px]">
                    <label className="form-label font-t mb-3" htmlFor="email">
                      Password
                    </label>
                    <div className="form-input-box relative">
                      <input
                        type={passToggle ? "text" : "password"}
                        id="email"
                        name="email"
                        className="form-input font-t p-3 rounded-[20px] bg-transparent w-full"
                        required
                        placeholder="e.g. m@rkJos6ph"
                      />
                      <i
                        className={`far text-white fa-eye absolute top-[50%] right-4 transform -translate-y-1/2 cursor-pointer ${
                          passToggle ? "fa-eye-slash" : "fa-eye"
                        }`}
                        onClick={() => setPassToggle(!passToggle)}
                      ></i>
                    </div>
                  </div>
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
