import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./LayoutWrapper";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompanyBuild from "./pages/CompanyBuild";
import GeographicCoverage from "./pages/GeographicCoverage";
import HelpOurAi from "./pages/HelpOurAi";
import IndustryCategories from "./pages/IndustryCategories";
import ExtraData from "./pages/ExtraData";
import EmailVerification from "./components/EmailVerification";
import Verification from "./pages/Verification";
import Plan from "./pages/Plan";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    // <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company-build" element={<CompanyBuild />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/geographic-coverage" element={<GeographicCoverage />} />
          <Route path="/help-our-ai" element={<HelpOurAi />} />
          <Route path="/industry-categories" element={<IndustryCategories />} />
          <Route path="/extra-data" element={<ExtraData />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </LayoutWrapper>
    // </Router>
  );
};

// hello
export default App;
