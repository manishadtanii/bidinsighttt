import React, { useState } from "react";
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

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let msg = "";
    let type = "error";
    if (!value) {
      msg = name === "email" ? "This field is required" : "Password is required";
    } else {
      if (name === "email") {
        msg = emailRegex.test(value) ? "This field is valid" : "Please enter a valid email";
        type = emailRegex.test(value) ? "success" : "error";
      } else if (name === "password") {
        msg = value.length >= 6 ? "This field is valid" : "Please enter a valid password";
        type = value.length >= 6 ? "success" : "error";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
    return type;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const getMessageType = (name) => {
    if (!touched[name]) return "";
    return errors[name] === "This field is valid" ? "success" : "error";
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let newTouched = { ...touched };
    let newErrors = { ...errors };
    let valid = true;
    Object.keys(fields).forEach((key) => {
      newTouched[key] = true;
      if (!fields[key]) {
        newErrors[key] = key === "email" ? "This field is required" : "Password is required";
        valid = false;
      } else {
        if (key === "email" && !emailRegex.test(fields[key])) {
          newErrors[key] = "Please enter a valid email";
          valid = false;
        } else if (key === "password" && fields[key].length < 6) {
          newErrors[key] = "Please enter a valid password";
          valid = false;
        } else {
          newErrors[key] = "This field is valid";
        }
      }
    });
    setTouched(newTouched);
    setErrors(newErrors);
    if (valid) {
      // Redirect or submit
      window.location.href = "/";
    }
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
                type="email"
                name="email"
                placeholder="e.g. jopseph.mark12@gmail.com"
                delay={100}
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                message={touched.email || errors.email ? errors.email : ""}
                messageType={getMessageType("email")}
              />
              <FormPassword
                label="Password"
                placeholder="e.g. m@rkJos6ph"
                name="password"
                id="password"
                delay={100}
                value={fields.password}
                onChange={handleChange}
                onBlur={handleBlur}
                message={touched.password || errors.password ? errors.password : ""}
                messageType={getMessageType("password")}
              />
            </div>
            <FormFooter data={formFooter} onNextClick={handleLogin} />
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
